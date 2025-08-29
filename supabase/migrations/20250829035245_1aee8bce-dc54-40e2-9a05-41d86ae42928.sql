-- Ensure TAOD tenant exists
INSERT INTO public.tenants (tenant_id, name, domain)
VALUES ('TAOD', 'TAOD', null)
ON CONFLICT (tenant_id) DO NOTHING;