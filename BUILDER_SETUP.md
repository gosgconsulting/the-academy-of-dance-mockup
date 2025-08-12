# Builder.io CMS Setup - Elite Dance Academy

## 🔐 API Keys
- **Public API Key**: `43ad973db23348b2847cc82fd8c0b54b`
- **Private API Key**: `bpk-a7af3cde3c104067a9bfc894be0ca290`

## 📊 Space Information
- **Model ID**: `da352822479e4a7489d2e1c944afc739`
- **Model Name**: `page`
- **Organization**: Elite Dance Academy

---

## 🎯 Existing Content IDs

### Found Pages (Still Available):
1. **Homepage**
   - ID: `753fd9c1d6b2420da34a02e9e21a3369`
   - Name: "Dance Academy Homepage"
   - Editor: https://builder.io/content/753fd9c1d6b2420da34a02e9e21a3369
   - Live URL: `/cms/home`

2. **About Us**
   - ID: `294aeefe60d14699937f62dcb66a982e`
   - Name: "About Us Page"
   - Editor: https://builder.io/content/294aeefe60d14699937f62dcb66a982e
   - Live URL: `/cms/about`

3. **Programs & Classes**
   - ID: `c8f10486540145738bbb39572fd74110`
   - Name: "Programs & Classes"
   - Editor: https://builder.io/content/c8f10486540145738bbb39572fd74110
   - Live URL: `/cms/programs`

---

## 🛠️ Custom Components Available

Your React app has these registered Builder.io components:

### 1. Hero Component
**Usage**: Homepage banner sections
**Props**:
- `title` (text): Main heading
- `subtitle` (text): Secondary heading
- `description` (longText): Body text
- `ctaText` (text): Button text
- `backgroundImage` (file): Background image

### 2. PageHeader Component
**Usage**: Page titles and banners
**Props**:
- `title` (text): Page title
- `subtitle` (text): Page subtitle
- `backgroundImage` (file): Background image

### 3. Programs Component
**Usage**: Showcase dance programs
**Props**:
- `title` (text): Section title
- `programs` (list): Array of program objects
  - `name` (text): Program name
  - `description` (longText): Program description
  - `image` (file): Program image
  - `ageGroup` (text): Age range

### 4. ClassSchedule Component
**Usage**: Display weekly schedules
**Props**:
- `title` (text): Schedule title
- `schedule` (list): Array of day objects
  - `day` (text): Day name
  - `classes` (list): Array of class objects
    - `time` (text): Class time
    - `class` (text): Class name
    - `level` (text): Skill level
    - `age` (text): Age group

### 5. MissionVision Component
**Usage**: About us sections
**Props**:
- `mission` (longText): Mission statement
- `vision` (longText): Vision statement

---

## 🎨 Content Templates

### Homepage Content
```json
{
  "title": "Elite Dance Academy - Premier Dance Training Singapore",
  "description": "Join Singapore's premier dance academy offering professional training in Ballet, Contemporary, Hip Hop, and more.",
  "components": [
    {
      "type": "Hero",
      "title": "Elite Dance Academy",
      "subtitle": "Where Passion Meets Excellence",
      "description": "Join Singapore's premier dance academy and discover your potential through our comprehensive training programs.",
      "ctaText": "Start Your Journey Today"
    },
    {
      "type": "Programs",
      "title": "Our Dance Programs",
      "programs": [
        {
          "name": "Classical Ballet",
          "description": "Master the fundamentals of classical ballet with our structured curriculum.",
          "ageGroup": "3+ years"
        },
        {
          "name": "Contemporary Dance", 
          "description": "Express yourself through fluid contemporary movement and modern techniques.",
          "ageGroup": "8+ years"
        },
        {
          "name": "Hip Hop & Street",
          "description": "Learn urban street dance styles and hip hop choreography.",
          "ageGroup": "5+ years"
        },
        {
          "name": "Jazz Dance",
          "description": "Combine technique with style in our dynamic jazz classes.",
          "ageGroup": "6+ years"
        }
      ]
    }
  ]
}
```

### About Us Content
```json
{
  "title": "About Elite Dance Academy - Our Story & Mission",
  "description": "Learn about our journey, mission, and commitment to excellence in dance education.",
  "components": [
    {
      "type": "PageHeader",
      "title": "About Us",
      "subtitle": "Our Story & Commitment to Excellence"
    },
    {
      "type": "MissionVision",
      "mission": "To provide exceptional dance education that nurtures creativity, builds confidence, and develops technical excellence in students of all ages.",
      "vision": "To be Singapore's leading dance academy, inspiring the next generation of dancers and artists."
    }
  ]
}
```

### Programs Content
```json
{
  "title": "Dance Programs & Class Schedules",
  "description": "Explore our comprehensive range of dance classes and programs for all ages and skill levels.",
  "components": [
    {
      "type": "PageHeader",
      "title": "Programs & Classes",
      "subtitle": "Find Your Perfect Dance Style"
    },
    {
      "type": "ClassSchedule",
      "title": "Weekly Class Schedule",
      "schedule": [
        {
          "day": "Monday",
          "classes": [
            {"time": "4:00 PM", "class": "Kids Ballet", "level": "Beginner", "age": "3-6 years"},
            {"time": "5:30 PM", "class": "Teen Hip Hop", "level": "Intermediate", "age": "13-17 years"},
            {"time": "7:00 PM", "class": "Adult Contemporary", "level": "All Levels", "age": "18+ years"}
          ]
        },
        {
          "day": "Tuesday",
          "classes": [
            {"time": "4:30 PM", "class": "Jazz Dance", "level": "Beginner", "age": "8+ years"},
            {"time": "6:00 PM", "class": "Adult Ballet", "level": "All Levels", "age": "18+ years"},
            {"time": "7:30 PM", "class": "Advanced Contemporary", "level": "Advanced", "age": "16+ years"}
          ]
        }
      ]
    }
  ]
}
```

---

## ⚙️ Configuration URLs

### Builder.io Dashboard
- **Content**: https://builder.io/content
- **Models**: https://builder.io/models
- **Settings**: https://builder.io/account/organization

### Preview Configuration
Set in Builder.io model settings:
- **Preview URL**: `https://your-domain.com/builder-preview`
- **Editor URL**: `https://your-domain.com/builder-preview`

### Your App URLs
- **Admin Panel**: `/admin`
- **CMS Dashboard**: `/cms-dashboard`
- **Live Pages**: `/cms/home`, `/cms/about`, `/cms/programs`

---

## 🚀 Quick Start Steps

1. **Access Admin Panel**: Go to `/admin` in your app
2. **Click Editor Links**: Use "Edit in Builder.io" buttons
3. **Add Components**: Drag components from left sidebar
4. **Configure Content**: Fill in the component properties
5. **Publish**: Click publish to make changes live
6. **Test**: View pages at `/cms/[slug]` URLs

Your Builder.io integration is complete and ready to use! 🎉
