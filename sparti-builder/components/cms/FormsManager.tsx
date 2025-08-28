import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, ExternalLink } from 'lucide-react';

interface FormData {
  id: string;
  name: string;
  description: string;
  fields: number;
  submissions: number;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
}

const DEMO_FORMS: FormData[] = [
  {
    id: '1',
    name: 'Contact Form',
    description: 'Main contact form for inquiries',
    fields: 5,
    submissions: 23,
    status: 'published',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: '2',
    name: 'Registration Form',
    description: 'User registration and membership form',
    fields: 8,
    submissions: 45,
    status: 'published',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18'
  },
  {
    id: '3',
    name: 'Newsletter Signup',
    description: 'Simple email subscription form',
    fields: 2,
    submissions: 112,
    status: 'draft',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-15'
  }
];

const FormsManager: React.FC = () => {
  const [forms, setForms] = useState<FormData[]>(DEMO_FORMS);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredForms = forms.filter(form =>
    form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFormStatus = (id: string) => {
    setForms(forms.map(form => 
      form.id === id 
        ? { ...form, status: form.status === 'published' ? 'draft' : 'published' }
        : form
    ));
  };

  const deleteForm = (id: string) => {
    if (window.confirm('Are you sure you want to delete this form?')) {
      setForms(forms.filter(form => form.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Forms</h2>
          <p className="text-gray-600 mt-1">Manage your website forms and submissions</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Form
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search forms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* Forms Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Form Name</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Fields</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Submissions</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Last Updated</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredForms.map((form) => (
                <tr key={form.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium text-gray-900">{form.name}</div>
                      <div className="text-sm text-gray-600">{form.description}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-900">{form.fields}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-900">{form.submissions}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      form.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {form.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-900">{form.updatedAt}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleFormStatus(form.id)}
                        className="p-1 text-gray-600 hover:text-gray-900 transition-colors"
                        title={form.status === 'published' ? 'Unpublish' : 'Publish'}
                      >
                        {form.status === 'published' ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                      <button className="p-1 text-gray-600 hover:text-blue-600 transition-colors" title="Edit">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-600 hover:text-green-600 transition-colors" title="View Submissions">
                        <ExternalLink className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteForm(form.id)}
                        className="p-1 text-gray-600 hover:text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredForms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No forms found</p>
          <p className="text-gray-400 mt-1">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default FormsManager;