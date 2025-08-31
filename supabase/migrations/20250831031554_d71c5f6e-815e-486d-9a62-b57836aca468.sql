-- First, update all existing sections to make room for the statistics section
UPDATE page_sections 
SET order_index = order_index + 1 
WHERE page_id = 'a12089a1-20c7-4f68-9761-c9420b4d124f' 
AND order_index >= 2;

-- Insert the Statistics section after the hero section
INSERT INTO page_sections (
  page_id, 
  section_id, 
  section_type, 
  order_index, 
  is_active, 
  content,
  created_at,
  updated_at
) VALUES (
  'a12089a1-20c7-4f68-9761-c9420b4d124f',
  'statistics',
  'StatisticsSection',
  2,
  true,
  jsonb_build_object(
    'title', 'Our Impact',
    'description', 'Celebrating our achievements in dance education',
    'statistics', jsonb_build_array(
      jsonb_build_object(
        'number', '10,000+',
        'label', 'Students Trained',
        'color', 'text-violet-500',
        'bgGlow', 'bg-violet-100'
      ),
      jsonb_build_object(
        'number', '40',
        'label', 'Years Experience', 
        'color', 'text-emerald-500',
        'bgGlow', 'bg-emerald-100'
      ),
      jsonb_build_object(
        'number', '95%',
        'label', 'Success Rate',
        'color', 'text-orange-500', 
        'bgGlow', 'bg-orange-100'
      ),
      jsonb_build_object(
        'number', '2000+',
        'label', 'Awards Won',
        'color', 'text-rose-500',
        'bgGlow', 'bg-rose-100'
      )
    )
  ),
  now(),
  now()
);