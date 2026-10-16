import { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';

export function useSiteContentEditor(sectionKey, fields) {
  const emptyForm = fields.reduce((acc, f) => ({ ...acc, [f]: '' }), {});
  const [formData, setFormData] = useState(emptyForm);
  const [originalData, setOriginalData] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [recordId, setRecordId] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setSaved(false);

    base44.entities.SiteContent
      .filter({ section_key: sectionKey })
      .then(records => {
        if (!mounted) return;
        if (records.length > 0) {
          const r = records[0];
          setRecordId(r.id);
          const loaded = fields.reduce((acc, f) => ({ ...acc, [f]: r[f] || '' }), emptyForm);
          setFormData(loaded);
          setOriginalData(loaded);
        } else {
          setRecordId(null);
          setFormData(emptyForm);
          setOriginalData(emptyForm);
        }
      })
      .catch(() => {
        if (!mounted) return;
        setRecordId(null);
        setFormData(emptyForm);
        setOriginalData(emptyForm);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionKey]);

  const handleChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSave = useCallback(async () => {
    setSaving(true);
    setSaved(false);
    try {
      // Build field-level changes for audit log
      const fieldChanges = [];
      for (const f of Object.keys(formData)) {
        const oldVal = originalData[f] || '';
        const newVal = formData[f] || '';
        if (oldVal !== newVal) {
          fieldChanges.push({ field: f, old_value: oldVal, new_value: newVal });
        }
      }

      const isUpdate = !!recordId;
      if (isUpdate) {
        await base44.entities.SiteContent.update(recordId, formData);
      } else {
        const created = await base44.entities.SiteContent.create({
          ...formData,
          section_key: sectionKey,
        });
        setRecordId(created.id);
      }

      // Log changes to audit trail (after successful save)
      if (fieldChanges.length > 0) {
        try {
          let userName = 'Unknown user';
          try {
            const user = await base44.auth.me();
            userName = user.full_name || user.email || 'Unknown user';
          } catch {}
          await base44.entities.ContentAuditLog.create({
            section_key: sectionKey,
            action: isUpdate ? 'update' : 'create',
            field_changes: JSON.stringify(fieldChanges),
            changed_by_name: userName,
          });
        } catch (e) {
          console.error('Audit log entry failed:', e);
        }
      }

      setOriginalData(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      // let it bubble
    }
    setSaving(false);
  }, [recordId, formData, originalData, sectionKey]);

  return { formData, loading, saving, saved, handleChange, handleSave };
}