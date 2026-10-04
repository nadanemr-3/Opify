import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Download, 
  UserCheck, 
  UserX, 
  Trash2, 
  Star, 
  Shield, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  X
} from 'lucide-react';
import { Language, AdminUser, UserRole } from '../../types';
import { translations } from '../../i18n/translations';

interface AdminUsersTabProps {
  language: Language;
  users: AdminUser[];
  onToggleUserStatus: (userId: string) => void;
  onToggleUserPremium?: (userId: string) => void;
  onDeleteUser?: (userId: string) => void;
  onAddUser?: (user: AdminUser) => void;
  onLogAudit?: (action: string, target: string, type: 'moderation' | 'security' | 'user') => void;
}

export const AdminUsersTab: React.FC<AdminUsersTabProps> = ({
  language,
  users,
  onToggleUserStatus,
  onToggleUserPremium,
  onDeleteUser,
  onAddUser,
  onLogAudit,
}) => {
  const t = translations[language];
  const isAr = language === 'ar';

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'deactivated'>('all');
  const [planFilter, setPlanFilter] = useState<'all' | 'premium' | 'free'>('all');

  // Add User Modal State
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('job_seeker');
  const [newGovernorate, setNewGovernorate] = useState('Cairo');
  const [newPhone, setNewPhone] = useState('+20 100 000 0000');
  const [newIsPremium, setNewIsPremium] = useState(false);

  const filteredUsers = users.filter((u) => {
    const matchesSearch = 
      u.name.toLowerCase().includes(search.toLowerCase()) || 
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.governorate && u.governorate.toLowerCase().includes(search.toLowerCase())) ||
      (u.phone && u.phone.includes(search));

    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || u.status === statusFilter;
    const matchesPlan = 
      planFilter === 'all' || 
      (planFilter === 'premium' ? u.isPremium : !u.isPremium);

    return matchesSearch && matchesRole && matchesStatus && matchesPlan;
  });

  const handleExportCsv = () => {
    const headers = ['ID', 'Name', 'Email', 'Role', 'Status', 'Plan', 'Applications', 'Governorate', 'Phone', 'Joined'];
    const rows = filteredUsers.map(u => [
      `"${u.id}"`,
      `"${u.name.replace(/"/g, '""')}"`,
      `"${u.email.replace(/"/g, '""')}"`,
      `"${u.role}"`,
      `"${u.status}"`,
      u.isPremium ? 'Premium' : 'Free',
      u.applicationsCount,
      `"${u.governorate || 'N/A'}"`,
      `"${u.phone || 'N/A'}"`,
      `"${u.createdAt}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `opify_users_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onLogAudit?.('Exported Users CSV', `${filteredUsers.length} accounts`, 'user');
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const created: AdminUser = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: newName.trim(),
      email: newEmail.trim(),
      role: newRole,
      status: 'active',
      joinedAt: new Date().toISOString().slice(0, 10),
      createdAt: new Date().toISOString().slice(0, 10),
      applicationsCount: 0,
      isPremium: newIsPremium,
      governorate: newGovernorate,
      phone: newPhone,
      lastLogin: 'Just now'
    };

    onAddUser?.(created);
    onLogAudit?.('Created User Account', `${created.name} (${created.role})`, 'user');

    // Reset
    setNewName('');
    setNewEmail('');
    setIsAddUserOpen(false);
  };

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-5">
      
      {/* Header & Controls Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-100 dark:border-slate-700">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              {t.adminTabUsers}
            </h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              {filteredUsers.length}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {isAr 
              ? 'إدارة حسابات الباحثين عن عمل، مسؤولي التوظيف، وترقية اشتراكات Premium' 
              : 'Manage job seekers, employers, assign moderator roles, and toggle premium access'}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Add User Button */}
          <button
            onClick={() => setIsAddUserOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isAr ? 'إضافة مستخدم / مشرف' : 'Add User'}</span>
          </button>

          {/* Export CSV */}
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 font-bold text-xs transition cursor-pointer"
            title="Download CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 absolute top-3 ltr:left-3 rtl:right-3 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isAr ? 'البحث بالاسم، البريد، المحافظة أو الهاتف...' : 'Search name, email, governorate, phone...'}
            className="w-full ltr:pl-9 rtl:pr-9 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden"
          />
        </div>

        {/* Role Filter */}
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value as any)}
          className="py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer focus:outline-hidden"
        >
          <option value="all">{isAr ? 'جميع الأدوار' : 'All Roles'}</option>
          <option value="job_seeker">{isAr ? 'باحث عن عمل (Seeker)' : 'Job Seeker'}</option>
          <option value="employer">{isAr ? 'صاحب عمل (Employer)' : 'Employer'}</option>
          <option value="moderator">{isAr ? 'مشرف محتوى (Moderator)' : 'Moderator'}</option>
          <option value="super_admin">{isAr ? 'مدير عام (Super Admin)' : 'Super Admin'}</option>
        </select>

        {/* Plan Filter */}
        <select
          value={planFilter}
          onChange={(e) => setPlanFilter(e.target.value as any)}
          className="py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer focus:outline-hidden"
        >
          <option value="all">{isAr ? 'جميع الباقات' : 'All Plans'}</option>
          <option value="premium">{isAr ? 'باقة Premium ⭐' : 'Premium Only'}</option>
          <option value="free">{isAr ? 'الباقة المجانية' : 'Free Plan'}</option>
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer focus:outline-hidden"
        >
          <option value="all">{isAr ? 'جميع الحالات' : 'All Status'}</option>
          <option value="active">{isAr ? 'النشطون (Active)' : 'Active'}</option>
          <option value="deactivated">{isAr ? 'المعطلون (Deactivated)' : 'Deactivated'}</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
        <table className="w-full text-xs text-left ltr:text-left rtl:text-right min-w-[700px]">
          <thead className="bg-slate-50 dark:bg-slate-900/80 text-slate-500 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="p-3.5">{t.adminUserColName}</th>
              <th className="p-3.5">{t.adminUserColRole}</th>
              <th className="p-3.5">{t.adminUserColPlan}</th>
              <th className="p-3.5">{t.adminUserColApps}</th>
              <th className="p-3.5">{t.adminUserColStatus}</th>
              <th className="p-3.5 text-center">{t.adminUserColActions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-750">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-400">
                  {isAr ? 'لا يوجد مستخدمون مطابقون لمعايير البحث' : 'No users matching filters.'}
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-750/50 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">
                    <div>
                      <span className="text-slate-900 dark:text-white">{user.name}</span>
                      <span className="block text-[11px] text-slate-400 font-normal">{user.email}</span>
                      {user.governorate && (
                        <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-2.5 h-2.5" />
                          {user.governorate} {user.phone && `• ${user.phone}`}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      user.role === 'super_admin'
                        ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                        : user.role === 'moderator'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                        : user.role === 'employer'
                        ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-3.5">
                    {onToggleUserPremium ? (
                      <button
                        onClick={() => {
                          onToggleUserPremium(user.id);
                          onLogAudit?.(user.isPremium ? 'Revoked Premium Plan' : 'Granted Premium Plan', user.name, 'user');
                        }}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold cursor-pointer transition ${
                          user.isPremium 
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-700' 
                            : 'bg-slate-100 text-slate-500 dark:bg-slate-800 hover:bg-amber-50'
                        }`}
                        title="Click to toggle premium"
                      >
                        <Star className={`w-3 h-3 ${user.isPremium ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
                        <span>{user.isPremium ? 'Premium' : 'Free'}</span>
                      </button>
                    ) : (
                      <span className="font-bold text-slate-600">{user.isPremium ? 'Premium' : 'Free'}</span>
                    )}
                  </td>
                  <td className="p-3.5 font-bold font-mono text-slate-800 dark:text-slate-200">
                    {user.applicationsCount}
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      user.status === 'active'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                        : 'bg-red-50 text-red-700 dark:bg-red-950/70 dark:text-red-300 border border-red-200 dark:border-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => {
                          onToggleUserStatus(user.id);
                          onLogAudit?.(user.status === 'active' ? 'Deactivated User' : 'Activated User', user.name, 'user');
                        }}
                        className={`px-2.5 py-1 rounded-lg text-white font-bold text-[11px] cursor-pointer ${
                          user.status === 'active'
                            ? 'bg-amber-600 hover:bg-amber-700'
                            : 'bg-emerald-600 hover:bg-emerald-700'
                        }`}
                      >
                        {user.status === 'active' ? t.btnDeactivate : t.btnActivate}
                      </button>

                      {onDeleteUser && (
                        <button
                          onClick={() => {
                            if (confirm(isAr ? 'حذف حساب هذا المستخدم نهائياً؟' : 'Delete user account permanently?')) {
                              onDeleteUser(user.id);
                              onLogAudit?.('Deleted User Account', user.name, 'user');
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer"
                          title="Delete user"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ADD USER MODAL */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-black text-slate-900 dark:text-white">
                {isAr ? 'إضافة مستخدم جديد أو مشرف' : 'Add User or Staff Account'}
              </h4>
              <button onClick={() => setIsAddUserOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isAr ? 'الاسم الكامل' : 'Full Name'} *
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Youssef El-Shater"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isAr ? 'البريد الإلكتروني' : 'Email Address'} *
                </label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="e.g. youssef@example.com"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'الدور / الصلاحية' : 'Role'}
                  </label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold"
                  >
                    <option value="job_seeker">Job Seeker</option>
                    <option value="employer">Employer</option>
                    <option value="moderator">Moderator</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'المحافظة' : 'Governorate'}
                  </label>
                  <input
                    type="text"
                    value={newGovernorate}
                    onChange={(e) => setNewGovernorate(e.target.value)}
                    placeholder="e.g. Cairo"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isAr ? 'رقم الهاتف' : 'Phone Number'}
                </label>
                <input
                  type="text"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="+20 100 000 0000"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="premiumCheck"
                  checked={newIsPremium}
                  onChange={(e) => setNewIsPremium(e.target.checked)}
                  className="rounded-md border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="premiumCheck" className="font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                  {isAr ? 'منح اشتراك Premium مفعل مجاناً' : 'Grant active Premium Pro access'}
                </label>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddUserOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs"
                >
                  {isAr ? 'إنشاء الحساب' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
