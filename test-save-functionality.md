# Testing Save Functionality

## Steps to Test:

1. **Start Content Server** (Done automatically)
   - Server should be running on http://localhost:3001
   - Check that API endpoints are accessible

2. **Test Save in Browser**
   - Navigate to the homepage (/)
   - Click "Edit with Sparti Builder" 
   - Make a content change (edit some text)
   - Click "Save" button
   - Should see "Saved ✓" status

3. **Verify Content Persistence**
   - Check if `public/content/home.json` file is created
   - Refresh the page - changes should persist
   - Check `public/content/versions/home.json` for version history

## Expected Results:
- ✅ Save button visible in edit mode
- ✅ Save operation completes successfully
- ✅ Content files created in public/content/
- ✅ Changes persist after page refresh

## Troubleshooting:
- If save fails, check browser Network tab for failed API calls
- Verify server logs for any errors
- Test server health: `curl http://localhost:3001/api/health`