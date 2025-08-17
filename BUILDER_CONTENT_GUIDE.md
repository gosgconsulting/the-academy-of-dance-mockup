# Builder.io Content Recreation Guide

## 🚨 Your content was deleted - here's how to recreate it:

### Quick Access
- **Admin Panel**: `/admin` - See what needs to be recreated
- **Builder.io Dashboard**: https://builder.io/content
- **Preview URL**: `${window.location.origin}/builder-preview`

---

## 📋 Pages to Recreate

### 1. Homepage
**Name**: `Homepage`  
**URL Path**: `/`  
**Title**: Elite Dance Academy - Premier Dance Training Singapore  
**Description**: Join Singapore's premier dance academy offering professional training in Ballet, Contemporary, Hip Hop, and more.

**Components to Add**:
1. **Hero Component**
   - Title: "Elite Dance Academy"
   - Subtitle: "Where Passion Meets Excellence"
   - Description: "Join Singapore's premier dance academy and discover your potential through our comprehensive training programs."
   - CTA Text: "Start Your Journey Today"
   - Background Image: Dance studio photo

2. **Programs Component**
   - Title: "Our Dance Programs"
   - Programs:
     - Classical Ballet (3+ years)
     - Contemporary Dance (8+ years)  
     - Hip Hop & Street (5+ years)
     - Jazz Dance (6+ years)

---

### 2. About Us
**Name**: `About Us`  
**URL Path**: `/about`  
**Title**: About Elite Dance Academy - Our Story & Mission  
**Description**: Learn about our journey, mission, and commitment to excellence in dance education.

**Components to Add**:
1. **PageHeader Component**
   - Title: "About Us"
   - Subtitle: "Our Story & Commitment to Excellence"
   - Background Image: Dance performance photo

2. **MissionVision Component**
   - Mission: "To provide exceptional dance education that nurtures creativity, builds confidence, and develops technical excellence in students of all ages."
   - Vision: "To be Singapore's leading dance academy, inspiring the next generation of dancers and artists."

---

### 3. Programs & Classes
**Name**: `Programs`  
**URL Path**: `/programs`  
**Title**: Dance Programs & Class Schedules  
**Description**: Explore our comprehensive range of dance classes and programs for all ages and skill levels.

**Components to Add**:
1. **PageHeader Component**
   - Title: "Programs & Classes"
   - Subtitle: "Find Your Perfect Dance Style"

2. **ClassSchedule Component**
   - Title: "Weekly Class Schedule"
   - Schedule:
     - **Monday**: Kids Ballet (4:00 PM), Teen Hip Hop (5:30 PM), Adult Contemporary (7:00 PM)
     - **Tuesday**: Jazz Dance (4:30 PM), Adult Ballet (6:00 PM), Advanced Contemporary (7:30 PM)
     - **Wednesday**: Pre-Ballet Toddlers (4:00 PM), Kids Hip Hop (5:30 PM), Intermediate Ballet (7:00 PM)
     - **Thursday**: Contemporary Beginner (4:30 PM), Adult Jazz (6:00 PM), Competition Team (7:30 PM)
     - **Saturday**: Family Dance (9:00 AM), Ballet Intensive (10:30 AM), Hip Hop Intensive (2:00 PM)

---

### 4. Contact
**Name**: `Contact`  
**URL Path**: `/contact`  
**Title**: Contact Elite Dance Academy  
**Description**: Get in touch to learn more about our programs or schedule a trial class.

**Components to Add**:
1. **PageHeader Component**
   - Title: "Contact Us"
   - Subtitle: "Ready to Start Your Dance Journey?"

---

## ⚙️ Builder.io Setup Steps

### 1. Set Preview URL
1. Go to https://builder.io/models
2. Click on "page" model
3. Set **Preview URL**: `https://your-domain.com/builder-preview`
4. Set **Editor URL**: `https://your-domain.com/builder-preview`

### 2. Create Each Page
1. Go to https://builder.io/content
2. Click "New" > "Page"
3. Set the name and URL path from above
4. Add components from the left sidebar
5. Configure each component with the provided content
6. Click "Publish" when complete

### 3. Available Components
Your React app has these custom components ready:
- ✅ **Hero** - Homepage banner with CTA
- ✅ **PageHeader** - Page title sections
- ✅ **Programs** - Dance program showcase
- ✅ **ClassSchedule** - Weekly timetable
- ✅ **MissionVision** - About us content

---

## 🎯 After Recreation

1. **Test Pages**: Visit `/cms/home`, `/cms/about`, `/cms/programs`
2. **Edit Content**: Use Builder.io visual editor
3. **Update URLs**: Make sure page URLs match your routing

---

## 🆘 Need Help?

- **Admin Panel**: `/admin` - Shows recreation status
- **Builder.io Docs**: https://builder.io/c/docs
- **Preview**: `/builder-preview` - Test component rendering

Your visual editor integration is complete - you just need to recreate the content in Builder.io!
