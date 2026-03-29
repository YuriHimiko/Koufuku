import React, { useState } from 'react';
import { utils, writeFile, read } from 'xlsx';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  Home, 
  Users, 
  AlertTriangle, 
  FileText, 
  BookOpen, 
  Settings, 
  Search, 
  Bell, 
  Smile,
  ChevronRight,
  User,
  UploadCloud,
  FileSpreadsheet,
  Download,
  ExternalLink,
  LogOut,
  Moon,
  Sun,
  Video,
  Maximize,
  Activity,
  Shield,
  ArrowLeft,
  Upload,
  Trash2,
  Lock,
  Menu,
  X,
  Calendar,
  MessageSquare,
  MoreHorizontal,
  Globe
} from 'lucide-react';
const INITIAL_STUDENTS = [
  { id: 1, name: 'Nguyễn Văn An (9A)', wellbeing: 80, status: 'Theo dõi thêm', color: 'bg-green-500' },
  { id: 2, name: 'Trần Thị Bình (9B)', wellbeing: 45, status: 'Sắp xếp gặp mặt', color: 'bg-yellow-500' },
  { id: 3, name: 'Lê Hoàng Cường (9A)', wellbeing: 25, status: 'Cần can thiệp', color: 'bg-red-500' },
  { id: 4, name: 'Phạm Thị Dung (9B)', wellbeing: 35, status: 'Rủi ro trung bình', color: 'bg-orange-500' },
  { id: 5, name: 'Hoàng Văn Em (9A)', wellbeing: 90, status: 'Theo dõi thêm', color: 'bg-green-500' },
  { id: 6, name: 'Đặng Thị Phương (9B)', wellbeing: 35, status: 'Cần can thiệp', color: 'bg-red-500' },
  { id: 7, name: 'Vũ Trọng Giáp (9A)', wellbeing: 75, status: 'Theo dõi thêm', color: 'bg-green-500' },
  { id: 8, name: 'Bùi Thị Hạnh (9B)', wellbeing: 40, status: 'Rủi ro trung bình', color: 'bg-orange-500' },
  { id: 9, name: 'Đỗ Văn Inh (9A)', wellbeing: 85, status: 'Theo dõi thêm', color: 'bg-green-500' },
  { id: 10, name: 'Ngô Thị Kim (9B)', wellbeing: 30, status: 'Cần can thiệp', color: 'bg-red-500' },
  { id: 11, name: 'Lý Minh Linh (9A)', wellbeing: 65, status: 'Sắp xếp gặp mặt', color: 'bg-yellow-500' },
  { id: 12, name: 'Phan Ngọc Mạnh (9B)', wellbeing: 95, status: 'Theo dõi thêm', color: 'bg-green-500' },
  { id: 13, name: 'Vương Hữu Nga (9A)', wellbeing: 40, status: 'Rủi ro trung bình', color: 'bg-orange-500' },
  { id: 14, name: 'Trịnh Đức Oanh (9B)', wellbeing: 20, status: 'Cần can thiệp', color: 'bg-red-500' },
  { id: 15, name: 'Đinh Thanh Phúc (9A)', wellbeing: 70, status: 'Theo dõi thêm', color: 'bg-green-500' },
  { id: 16, name: 'Nguyễn Xuân Quân (9B)', wellbeing: 55, status: 'Sắp xếp gặp mặt', color: 'bg-yellow-500' },
  { id: 17, name: 'Trần Văn Huy (9A)', wellbeing: 88, status: 'Theo dõi thêm', color: 'bg-green-500' },
  { id: 18, name: 'Lê Thị Sang (9B)', wellbeing: 38, status: 'Cần can thiệp', color: 'bg-red-500' },
  { id: 19, name: 'Phạm Hoàng Tâm (9A)', wellbeing: 62, status: 'Sắp xếp gặp mặt', color: 'bg-yellow-500' },
  { id: 20, name: 'Hoàng Trọng Uyên (9B)', wellbeing: 92, status: 'Theo dõi thêm', color: 'bg-green-500' },
  { id: 21, name: 'Đặng Minh Vinh (9A)', wellbeing: 48, status: 'Sắp xếp gặp mặt', color: 'bg-yellow-500' },
  { id: 22, name: 'Vũ Ngọc Vy (9B)', wellbeing: 28, status: 'Cần can thiệp', color: 'bg-red-500' },
  { id: 23, name: 'Bùi Hữu Xuân (9A)', wellbeing: 78, status: 'Theo dõi thêm', color: 'bg-green-500' },
  { id: 24, name: 'Đỗ Đức Yến (9B)', wellbeing: 58, status: 'Sắp xếp gặp mặt', color: 'bg-yellow-500' },
  { id: 25, name: 'Ngô Thanh Hải (9A)', wellbeing: 82, status: 'Theo dõi thêm', color: 'bg-green-500' },
  { id: 26, name: 'Lý Xuân Đạt (9B)', wellbeing: 32, status: 'Cần can thiệp', color: 'bg-red-500' },
  { id: 27, name: 'Phan Văn Tuấn (9A)', wellbeing: 68, status: 'Sắp xếp gặp mặt', color: 'bg-yellow-500' },
  { id: 28, name: 'Vương Thị Anh (9B)', wellbeing: 98, status: 'Theo dõi thêm', color: 'bg-green-500' },
  { id: 29, name: 'Trịnh Hoàng Khoa (9A)', wellbeing: 42, status: 'Sắp xếp gặp mặt', color: 'bg-yellow-500' },
  { id: 30, name: 'Đinh Trọng Long (9B)', wellbeing: 22, status: 'Cần can thiệp', color: 'bg-red-500' },
  { id: 31, name: 'Nguyễn Minh An (9A)', wellbeing: 72, status: 'Theo dõi thêm', color: 'bg-green-500' },
  { id: 32, name: 'Trần Ngọc Bình (9B)', wellbeing: 52, status: 'Sắp xếp gặp mặt', color: 'bg-yellow-500' },
  { id: 33, name: 'Lê Hữu Cường (9A)', wellbeing: 86, status: 'Theo dõi thêm', color: 'bg-green-500' },
  { id: 34, name: 'Phạm Đức Dung (9B)', wellbeing: 36, status: 'Cần can thiệp', color: 'bg-red-500' },
  { id: 35, name: 'Hoàng Thanh Em (9A)', wellbeing: 66, status: 'Sắp xếp gặp mặt', color: 'bg-yellow-500' },
  { id: 36, name: 'Đặng Xuân Phương (9B)', wellbeing: 96, status: 'Theo dõi thêm', color: 'bg-green-500' },
  { id: 37, name: 'Vũ Văn Giáp (9A)', wellbeing: 46, status: 'Sắp xếp gặp mặt', color: 'bg-yellow-500' },
  { id: 38, name: 'Bùi Thị Hạnh (9B)', wellbeing: 26, status: 'Cần can thiệp', color: 'bg-red-500' },
  { id: 39, name: 'Đỗ Hoàng Inh (9A)', wellbeing: 76, status: 'Theo dõi thêm', color: 'bg-green-500' },
  { id: 40, name: 'Ngô Trọng Kim (9B)', wellbeing: 56, status: 'Sắp xếp gặp mặt', color: 'bg-yellow-500' },
  { id: 41, name: 'Lý Minh Linh (9A)', wellbeing: 84, status: 'Theo dõi thêm', color: 'bg-green-500' },
  { id: 42, name: 'Phan Ngọc Mạnh (9B)', wellbeing: 34, status: 'Cần can thiệp', color: 'bg-red-500' },
  { id: 43, name: 'Vương Hữu Nga (9A)', wellbeing: 64, status: 'Sắp xếp gặp mặt', color: 'bg-yellow-500' },
  { id: 44, name: 'Trịnh Đức Oanh (9B)', wellbeing: 94, status: 'Theo dõi thêm', color: 'bg-green-500' },
  { id: 45, name: 'Đinh Thanh Phúc (9A)', wellbeing: 44, status: 'Sắp xếp gặp mặt', color: 'bg-yellow-500' },
];

const recentAlerts = [
  { id: 1, name: 'Học sinh A (9A)', issue: 'Lo âu cao [Đỏ]', color: 'bg-[#fce8e6]' },
  { id: 2, name: 'Học sinh B (9B)', issue: 'Hành vi bất thường [Vàng]', color: 'bg-[#fef3c7]' },
  { id: 3, name: 'Học sinh C (9B)', issue: 'Hành vi bất thường [Vàng]', color: 'bg-[#fef3c7]' },
  { id: 4, name: 'Học sinh A (9A)', issue: 'Lo âu cao [Đỏ]', color: 'bg-[#fce8e6]' },
  { id: 5, name: 'Học sinh E (9B)', issue: 'Hành vi bất thường [Vàng]', color: 'bg-[#fef3c7]' },
  { id: 6, name: 'Học sinh B (9A)', issue: 'Lo âu cao [Đỏ]', color: 'bg-[#fce8e6]' },
];

function StudentListView({ isDarkMode, language, setStudents, students }: { isDarkMode: boolean, language: string, setStudents: (students: any[]) => void, students: any[] }) {
  const t = translations[language as keyof typeof translations];
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      const wb = read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = utils.sheet_to_json(ws);
      
      // Transform data to match our student structure
      const newStudents = data.map((item: any, index: number) => {
        const wellbeing = parseInt(item['Chỉ số Hạnh phúc'] || item['wellbeing'] || '70');
        let status = item['Trạng thái'] || item['status'] || 'Theo dõi thêm';
        let color = 'bg-green-500';
        
        if (wellbeing < 30) {
          color = 'bg-red-500';
          status = language === 'vi' ? 'Cần can thiệp' : 'Intervention needed';
        } else if (wellbeing < 50) {
          color = 'bg-orange-500';
          status = language === 'vi' ? 'Rủi ro trung bình' : 'Medium risk';
        } else if (wellbeing < 70) {
          color = 'bg-yellow-500';
          status = language === 'vi' ? 'Sắp xếp gặp mặt' : 'Arrange meeting';
        }
        
        return {
          id: INITIAL_STUDENTS.length + index + 1,
          name: item['Họ và tên'] || item['name'] || 'Unknown Student',
          wellbeing,
          status,
          color
        };
      });

      setStudents(newStudents);
      setIsUploaded(true);
    };
    reader.readAsBinaryString(file);
  };

  if (isUploaded || students.length > INITIAL_STUDENTS.length) {
    return (
      <div className="flex-1 overflow-auto p-8">
        <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{t.studentList}</h2>
        <div className={`rounded-2xl p-6 shadow-sm transition-colors ${isDarkMode ? 'bg-[#121212] border border-white/10' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{t.allStudents} ({students.length})</h3>
            <label className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isDarkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-[#dceaea] text-gray-800 hover:bg-[#cce6e6]'}`}>
              {t.uploadOtherFile}
              <input 
                type="file" 
                accept=".xlsx, .xls" 
                className="hidden" 
                onChange={handleFileUpload}
              />
            </label>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className={`${isDarkMode ? 'border-b border-white/10' : 'text-gray-500 border-b border-gray-200'}`}>
                <tr>
                  <th className={`pb-4 font-semibold uppercase text-[11px] tracking-wider ${isDarkMode ? 'text-[#A3A3A3]' : 'text-gray-500'}`}>{t.student}</th>
                  <th className={`pb-4 font-semibold uppercase text-[11px] tracking-wider text-center ${isDarkMode ? 'text-[#A3A3A3]' : 'text-gray-500'}`}>{t.wellbeingIndex}</th>
                  <th className={`pb-4 font-semibold uppercase text-[11px] tracking-wider text-center ${isDarkMode ? 'text-[#A3A3A3]' : 'text-gray-500'}`}>{t.status}</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className={`border-b last:border-0 ${isDarkMode ? 'border-white/5' : 'border-gray-50'}`}>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-gray-500 ${isDarkMode ? 'bg-white/5' : 'bg-gray-200'}`}>
                          <User className="w-4 h-4" />
                        </div>
                        <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{student.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div className={`h-full ${student.color}`} style={{ width: `${student.wellbeing}%` }}></div>
                        </div>
                        <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{student.wellbeing}%</span>
                      </div>
                    </td>
                    <td className="py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        student.color === 'bg-red-500' ? 'bg-red-100 text-red-800' : 
                        student.color === 'bg-orange-500' ? 'bg-orange-100 text-orange-800' :
                        student.color === 'bg-yellow-500' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto p-8 flex flex-col items-center justify-center">
      <div className={`rounded-2xl p-10 shadow-sm max-w-lg w-full text-center border-2 border-dashed transition-colors ${isDarkMode ? 'bg-[#121212] border-white/10' : 'bg-white border-gray-200'}`}>
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isDarkMode ? 'bg-white/5 text-blue-400' : 'bg-[#eaf4f4] text-[#3b82f6]'}`}>
          <FileSpreadsheet className="w-8 h-8" />
        </div>
        <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{t.importStudentList}</h2>
        <p className={`mb-8 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{t.uploadXlsxDesc}</p>
        
        <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#3b82f6] text-white rounded-xl font-medium hover:bg-blue-600 transition-colors">
          <UploadCloud className="w-5 h-5" />
          <span>{t.selectXlsx}</span>
          <input 
            type="file" 
            accept=".xlsx, .xls" 
            className="hidden" 
            onChange={handleFileUpload}
          />
        </label>
      </div>
    </div>
  );
}

function AlertsView({ isDarkMode, language, onSelectAlert, students }: { isDarkMode: boolean, language: string, onSelectAlert: (alert: any) => void, students: any[] }) {
  const t = translations[language as keyof typeof translations];
  const alertStudents = students.filter(s => s.color === 'bg-yellow-500' || s.color === 'bg-red-500' || s.color === 'bg-orange-500' || s.color === 'bg-green-500');

  return (
    <div className="flex-1 overflow-auto p-8">
      <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{t.studentAlerts}</h2>
      <div className={`rounded-2xl p-6 shadow-sm transition-colors ${isDarkMode ? 'bg-[#121212] border border-white/10' : 'bg-white'}`}>
        <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{t.followUpList}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className={`${isDarkMode ? 'border-b border-white/10' : 'text-gray-500 border-b border-gray-200'}`}>
              <tr>
                <th className={`pb-4 font-semibold uppercase text-[11px] tracking-wider ${isDarkMode ? 'text-[#A3A3A3]' : 'text-gray-500'}`}>{t.student}</th>
                <th className={`pb-4 font-semibold uppercase text-[11px] tracking-wider text-center ${isDarkMode ? 'text-[#A3A3A3]' : 'text-gray-500'}`}>{t.alertLevel}</th>
                <th className={`pb-4 font-semibold uppercase text-[11px] tracking-wider text-center ${isDarkMode ? 'text-[#A3A3A3]' : 'text-gray-500'}`}>{t.status}</th>
                <th className={`pb-4 font-semibold uppercase text-[11px] tracking-wider text-right ${isDarkMode ? 'text-[#A3A3A3]' : 'text-gray-500'}`}>{t.action}</th>
              </tr>
            </thead>
            <tbody>
              {alertStudents.map((student) => (
                <tr key={student.id} className={`border-b last:border-0 ${isDarkMode ? 'border-white/5' : 'border-gray-50'}`}>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-gray-500 ${isDarkMode ? 'bg-white/5' : 'bg-gray-200'}`}>
                        <User className="w-4 h-4" />
                      </div>
                      <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{student.name}</span>
                    </div>
                  </td>
                  <td className="py-4 align-middle text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      student.color === 'bg-red-500' ? 'bg-red-100 text-red-800' : 
                      student.color === 'bg-orange-500' ? 'bg-orange-100 text-orange-800' :
                      student.color === 'bg-yellow-500' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {student.color === 'bg-red-500' ? t.alertRed : 
                       student.color === 'bg-orange-500' ? t.alertOrange :
                       student.color === 'bg-yellow-500' ? t.alertYellow : t.stable}
                    </span>
                  </td>
                  <td className={`py-4 text-center font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                    {student.status === 'Theo dõi thêm' ? t.monitoring :
                     student.status === 'Sắp xếp gặp mặt' ? t.arrangeMeeting :
                     student.status === 'Cần can thiệp' ? t.interventionNeeded :
                     student.status === 'Rủi ro trung bình' ? t.mediumRisk : student.status}
                  </td>
                  <td className="py-4 text-right">
                    <button 
                      onClick={() => onSelectAlert({ 
                        name: student.name, 
                        class: student.name.match(/\(([^)]+)\)/)?.[1] || '9A', 
                        level: student.color === 'bg-red-500' ? 'red' : 
                               student.color === 'bg-orange-500' ? 'orange' :
                               student.color === 'bg-yellow-500' ? 'yellow' : 'green', 
                        status: student.color === 'bg-red-500' ? t.alertRed : 
                                student.color === 'bg-orange-500' ? t.alertOrange :
                                student.color === 'bg-yellow-500' ? t.alertYellow : t.stable 
                      })}
                      className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${isDarkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-[#dceaea] text-gray-800 hover:bg-[#cce6e6]'}`}
                    >
                      {t.viewDetails}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const meetingReports = [
  { id: 1, studentName: 'Lê Hoàng Cường', class: '9A', date: '28/02/2026', counselor: 'Bảo Minh', summary: 'Học sinh có dấu hiệu áp lực học tập từ gia đình. Đã trao đổi và hướng dẫn cách quản lý thời gian, giảm căng thẳng.', status: 'Đã hoàn thành' },
  { id: 2, studentName: 'Đặng Thị Phương', class: '9B', date: '27/02/2026', counselor: 'Bảo Minh', summary: 'Học sinh gặp khó khăn trong việc hòa nhập với bạn bè mới. Đã tư vấn kỹ năng giao tiếp và đề xuất tham gia câu lạc bộ.', status: 'Đang theo dõi' },
  { id: 3, studentName: 'Trịnh Đức Oanh', class: '9B', date: '25/02/2026', counselor: 'Bảo Minh', summary: 'Học sinh có biểu hiện lo âu trước kỳ thi. Đã thực hành các bài tập thư giãn và lập kế hoạch ôn tập chi tiết.', status: 'Đã hoàn thành' },
  { id: 4, studentName: 'Ngô Thị Kim', class: '9B', date: '22/02/2026', counselor: 'Bảo Minh', summary: 'Học sinh chia sẻ về mâu thuẫn với bạn thân. Đã hướng dẫn cách giải quyết xung đột và kiểm soát cảm xúc.', status: 'Đang theo dõi' },
  { id: 5, studentName: 'Vũ Ngọc Vy', class: '9B', date: '20/02/2026', counselor: 'Bảo Minh', summary: 'Học sinh cảm thấy thiếu động lực học tập. Đã cùng học sinh xác định mục tiêu ngắn hạn và dài hạn.', status: 'Đã hoàn thành' },
];

function ReportsView({ isDarkMode, language, students }: { isDarkMode: boolean, language: string, students: any[] }) {
  const t = translations[language as keyof typeof translations];
  const [isCreating, setIsCreating] = useState(false);

  if (isCreating) {
    return (
      <div className="flex-1 overflow-auto p-8">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => setIsCreating(false)}
            className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-white text-gray-800'}`}
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{t.createNewMinute}</h2>
        </div>

        <div className={`rounded-2xl p-8 shadow-sm max-w-3xl transition-colors ${isDarkMode ? 'bg-[#121212] border border-white/10' : 'bg-white'}`}>
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t.studentName}</label>
                <select className={`w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200'}`}>
                  <option value="">{t.searchPlaceholder}</option>
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t.meetingDate}</label>
                <input 
                  type="date" 
                  className={`w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200'}`}
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t.reason}</label>
              <input 
                type="text" 
                placeholder={t.placeholderReason}
                className={`w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200'}`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t.content}</label>
              <textarea 
                rows={5}
                placeholder={t.placeholderContent}
                className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200'}`}
              ></textarea>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t.proposal}</label>
              <textarea 
                rows={3}
                placeholder={t.placeholderProposal}
                className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200'}`}
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t.status}</label>
                <select className={`w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200'}`}>
                  <option value="Đang theo dõi">{t.monitoringStatus}</option>
                  <option value="Đã hoàn thành">{t.completedStatus}</option>
                  <option value="Cần can thiệp khẩn cấp">{t.urgentIntervention}</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t.responsible}</label>
                <input 
                  type="text" 
                  defaultValue="Bảo Minh"
                  disabled
                  className={`w-full border rounded-xl px-4 py-2.5 outline-none cursor-not-allowed ${isDarkMode ? 'bg-white/10 border-white/10 text-gray-500' : 'bg-gray-100 border-gray-200 text-gray-500'}`}
                />
              </div>
            </div>

            <div className={`flex justify-end gap-3 pt-4 border-t ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
              <button 
                type="button"
                onClick={() => setIsCreating(false)}
                className={`px-6 py-2.5 rounded-xl font-medium transition-colors ${isDarkMode ? 'text-gray-400 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {t.cancel}
              </button>
              <button 
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-6 py-2.5 bg-[#3b82f6] text-white rounded-xl font-medium hover:bg-blue-600 transition-colors shadow-sm"
              >
                {t.saveMinute}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto p-8">
      <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{t.reportsAndMinutes}</h2>
      <div className={`rounded-2xl p-6 shadow-sm transition-colors ${isDarkMode ? 'bg-[#121212] border border-white/10' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{t.recentMinutes}</h3>
          <button 
            onClick={() => setIsCreating(true)}
            className="px-4 py-2 bg-[#3b82f6] text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            {t.createNewMinute}
          </button>
        </div>
        
        <div className="grid gap-4">
          {meetingReports.map((report) => (
            <div key={report.id} className={`rounded-xl p-5 hover:shadow-sm transition-all border ${isDarkMode ? 'bg-white/5 border-white/5 hover:border-white/10' : 'bg-gray-50/50 border-gray-100 hover:border-blue-100'}`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{report.studentName} <span className={`text-sm font-normal ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>({report.class})</span></h4>
                  <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{t.meetingDate}: {report.date} • {t.responsible}: {report.counselor}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${report.status === 'Đã hoàn thành' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                  {report.status === 'Đã hoàn thành' ? t.completedStatus : report.status === 'Đang theo dõi' ? t.monitoringStatus : report.status}
                </span>
              </div>
              <div className={`p-4 rounded-lg border mt-3 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100'}`}>
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t.summaryContent}</span> {report.summary}
                </p>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${isDarkMode ? 'text-gray-400 hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'}`}>
                  {t.editBtn}
                </button>
                <button className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${isDarkMode ? 'bg-[#dceaea] text-gray-800 hover:bg-[#cce6e6]' : 'bg-[#dceaea] text-gray-800 hover:bg-[#cce6e6]'}`}>
                  {t.viewDetailsBtn}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const resources = [
  { id: 1, title: 'Sổ tay Chăm sóc Sức khỏe Tâm thần Trẻ em (UNICEF)', category: 'Tài liệu chuyên môn', type: 'PDF', size: '4.2 MB', url: 'https://www.unicef.org/vietnam/media/4161/file/S%E1%BB%95%20tay%20h%C6%B0%E1%BB%9Bng%20d%E1%BA%ABn%20ch%C4%83m%20s%C3%B3c%20s%E1%BB%A9c%20kh%E1%BB%8Fe%20t%C3%A2m%20th%E1%BA%A7n%20tr%E1%BA%BB%20em%20v%C3%A0%20v%E1%BB%8B%20th%C3%A0nh%20ni%C3%AAn.pdf' },
  { id: 2, title: 'Khóa học Sơ cứu Tâm lý (Johns Hopkins / Coursera)', category: 'Kỹ năng tham vấn', type: 'Khóa học', size: 'Online', url: 'https://www.coursera.org/learn/psychological-first-aid' },
  { id: 3, title: 'Sơ cứu tâm lý: Hướng dẫn thực địa (WHO)', category: 'Xử lý tình huống', type: 'PDF', size: '1.5 MB', url: 'https://iris.who.int/bitstream/handle/10665/44615/9789241548205_eng.pdf' },
  { id: 4, title: 'Đường dây nóng Ngày Mai (Hỗ trợ tâm lý)', category: 'Xử lý tình huống', type: 'Website', size: 'Online', url: 'https://ngaymai.vn/' },
  { id: 5, title: 'Cẩm nang Truyền thông Sức khỏe Tâm thần (Bộ Y tế)', category: 'Tài liệu chuyên môn', type: 'Website', size: 'Online', url: 'https://moh.gov.vn/' },
  { id: 6, title: 'Hướng dẫn hỗ trợ tâm lý học đường (Bộ GD&ĐT)', category: 'Tài liệu chuyên môn', type: 'PDF', size: '2.8 MB', url: '#' },
  { id: 7, title: 'Kỹ năng lắng nghe thấu cảm trong tham vấn', category: 'Kỹ năng tham vấn', type: 'DOCX', size: '1.2 MB', url: '#' },
  { id: 8, title: 'Quy trình can thiệp khủng hoảng tâm lý', category: 'Xử lý tình huống', type: 'PDF', size: '3.5 MB', url: '#' },
  { id: 9, title: 'Tài liệu tập huấn về sức khỏe tâm thần cho giáo viên', category: 'Tài liệu chuyên môn', type: 'PPTX', size: '12.4 MB', url: '#' },
  { id: 10, title: 'Ứng phó với bạo lực học đường và bắt nạt qua mạng', category: 'Xử lý tình huống', type: 'PDF', size: '5.1 MB', url: '#' },
  { id: 11, title: 'Phát triển trí tuệ cảm xúc (EQ) cho học sinh', category: 'Kỹ năng tham vấn', type: 'PDF', size: '4.7 MB', url: '#' },
  { id: 12, title: 'Kỹ thuật thư giãn và kiểm soát căng thẳng', category: 'Kỹ năng tham vấn', type: 'Video', size: '45 MB', url: '#' },
];

function ResourcesView({ isDarkMode, language }: { isDarkMode: boolean, language: string }) {
  const t = translations[language as keyof typeof translations];
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [localResources, setLocalResources] = useState(resources);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newResource = {
        id: localResources.length + 1,
        title: file.name,
        category: activeCategory || t.professionalDocs,
        type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        url: '#'
      };
      setLocalResources([newResource, ...localResources]);
      alert(`${t.uploadSuccessMsg}${file.name}`);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm(t.confirmDeleteDoc)) {
      setLocalResources(localResources.filter(r => r.id !== id));
    }
  };

  const filteredResources = localResources.filter(r => {
    const matchesCategory = activeCategory ? r.category === activeCategory : true;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex-1 overflow-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className={`text-2xl font-bold leading-none ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{t.resources}</h2>
        <label className="cursor-pointer flex items-center justify-center gap-2 px-5 py-2.5 bg-[#3b82f6] text-white rounded-xl text-sm font-semibold hover:bg-blue-600 transition-all shadow-md active:scale-95">
          <Upload className="w-4 h-4" />
          {t.uploadDocument}
          <input type="file" className="hidden" onChange={handleFileUpload} />
        </label>
      </div>
      
      <div className="grid grid-cols-3 gap-6 mb-10">
        <button 
          onClick={() => setActiveCategory(activeCategory === 'Tài liệu chuyên môn' ? null : 'Tài liệu chuyên môn')}
          className={`text-left rounded-2xl p-6 border transition-all ${activeCategory === 'Tài liệu chuyên môn' ? (isDarkMode ? 'bg-blue-900/30 border-blue-500 shadow-lg' : 'bg-blue-100 border-blue-300 shadow-md') : (isDarkMode ? 'bg-[#1a1a1a] border-white/5 hover:bg-white/5' : 'bg-blue-50 border-blue-100 hover:bg-blue-100/50')}`}
        >
          <BookOpen className={`w-8 h-8 mb-3 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />
          <h3 className={`font-bold text-lg mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{t.professionalDocs}</h3>
          <p className={`text-sm ${isDarkMode ? 'text-[#A3A3A3]' : 'text-gray-600'}`}>{t.professionalDocsDesc}</p>
        </button>
        <button 
          onClick={() => setActiveCategory(activeCategory === 'Kỹ năng tham vấn' ? null : 'Kỹ năng tham vấn')}
          className={`text-left rounded-2xl p-6 border transition-all ${activeCategory === 'Kỹ năng tham vấn' ? (isDarkMode ? 'bg-green-900/30 border-green-500 shadow-lg' : 'bg-green-100 border-green-300 shadow-md') : (isDarkMode ? 'bg-[#1a1a1a] border-white/5 hover:bg-white/5' : 'bg-green-50 border-green-100 hover:bg-green-100/50')}`}
        >
          <Users className={`w-8 h-8 mb-3 ${isDarkMode ? 'text-green-400' : 'text-green-500'}`} />
          <h3 className={`font-bold text-lg mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{t.counselingSkills}</h3>
          <p className={`text-sm ${isDarkMode ? 'text-[#A3A3A3]' : 'text-gray-600'}`}>{t.counselingSkillsDesc}</p>
        </button>
        <button 
          onClick={() => setActiveCategory(activeCategory === 'Xử lý tình huống' ? null : 'Xử lý tình huống')}
          className={`text-left rounded-2xl p-6 border transition-all ${activeCategory === 'Xử lý tình huống' ? (isDarkMode ? 'bg-orange-900/30 border-orange-500 shadow-lg' : 'bg-orange-100 border-orange-300 shadow-md') : (isDarkMode ? 'bg-[#1a1a1a] border-white/5 hover:bg-white/5' : 'bg-orange-50 border-orange-100 hover:bg-orange-100/50')}`}
        >
          <AlertTriangle className={`w-8 h-8 mb-3 ${isDarkMode ? 'text-orange-400' : 'text-orange-500'}`} />
          <h3 className={`font-bold text-lg mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{t.caseHandling}</h3>
          <p className={`text-sm ${isDarkMode ? 'text-[#A3A3A3]' : 'text-gray-600'}`}>{t.caseHandlingDesc}</p>
        </button>
      </div>

      <div className={`rounded-2xl p-6 shadow-sm transition-colors ${isDarkMode ? 'bg-[#121212] border border-white/10' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-8">
          <h3 className={`text-lg font-bold leading-none ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{activeCategory ? `${t.category}: ${activeCategory}` : t.featuredDocs}</h3>
          <div className="relative ml-6">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder={t.searchDocs} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-10 pr-4 py-2.5 w-64 md:w-80 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-gray-200'}`}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className={`${isDarkMode ? 'border-b border-white/10' : 'text-gray-500 border-b border-gray-200'}`}>
              <tr>
                <th className={`pb-4 font-semibold uppercase text-[11px] tracking-wider ${isDarkMode ? 'text-[#A3A3A3]' : 'text-gray-500'}`}>{t.docName}</th>
                <th className={`pb-4 font-semibold uppercase text-[11px] tracking-wider ${isDarkMode ? 'text-[#A3A3A3]' : 'text-gray-500'}`}>{t.category}</th>
                <th className={`pb-4 font-semibold uppercase text-[11px] tracking-wider ${isDarkMode ? 'text-[#A3A3A3]' : 'text-gray-500'}`}>{t.format}</th>
                <th className={`pb-4 font-semibold uppercase text-[11px] tracking-wider text-right ${isDarkMode ? 'text-[#A3A3A3]' : 'text-gray-500'}`}>{t.action}</th>
              </tr>
            </thead>
            <tbody>
              {filteredResources.map((resource) => (
                <tr key={resource.id} className={`border-b last:border-0 transition-colors ${isDarkMode ? 'border-white/5 hover:bg-white/5' : 'border-gray-50 hover:bg-gray-50/50'}`}>
                  <td className={`py-4 font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {resource.title}
                  </td>
                  <td className={`py-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isDarkMode ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>
                      {resource.category === 'Tài liệu chuyên môn' ? t.professionalDocs :
                       resource.category === 'Kỹ năng tham vấn' ? t.counselingSkills :
                       resource.category === 'Xử lý tình huống' ? t.caseHandling : resource.category}
                    </span>
                  </td>
                  <td className={`py-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    {resource.type} • {resource.size}
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex justify-end gap-5">
                      <a href={resource.url} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'text-gray-400 hover:text-blue-400 hover:bg-white/5' : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'}`} title="Truy cập / Xem">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      {(resource.type === 'PDF' || resource.type === 'DOCX' || resource.type === 'PPTX') && (
                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'text-gray-400 hover:text-blue-400 hover:bg-white/5' : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'}`} title="Tải xuống">
                          <Download className="w-4 h-4" />
                        </a>
                      )}
                      <button 
                        onClick={() => handleDelete(resource.id)}
                        className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'text-gray-400 hover:text-red-400 hover:bg-red-400/10' : 'text-gray-500 hover:text-red-600 hover:bg-red-50'}`}
                        title="Xóa tài liệu"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredResources.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              {t.noDocsFound}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CameraMonitoringView({ onBack, isDarkMode, language }: { onBack: () => void, isDarkMode: boolean, language: string }) {
  const t = translations[language as keyof typeof translations];
  const cameras = [
    { id: 1, name: t.cam9A, status: 'Live', emotion: t.emotionFocused, count: 28, color: 'text-indigo-500', video: 'https://assets.mixkit.co/videos/preview/mixkit-students-in-a-classroom-1536-large.mp4' },
    { id: 2, name: t.cam9B, status: 'Live', emotion: t.emotionHappy, count: 30, color: 'text-green-500', video: 'https://assets.mixkit.co/videos/preview/mixkit-teacher-explaining-a-topic-to-her-students-41551-large.mp4' },
    { id: 3, name: t.camLibrary, status: 'Live', emotion: t.emotionQuiet, count: 15, color: 'text-blue-500', video: 'https://assets.mixkit.co/videos/preview/mixkit-group-of-students-working-in-a-library-41550-large.mp4' },
    { id: 4, name: t.camHallway, status: 'Live', emotion: t.emotionNormal, count: 12, color: 'text-orange-500', video: 'https://assets.mixkit.co/videos/preview/mixkit-students-walking-in-a-university-hallway-41549-large.mp4' },
  ];

  return (
    <div className="flex-1 overflow-auto p-8">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={onBack}
          className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-100 text-gray-800'}`}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{t.cameraSystem}</h2>
        <div className="ml-auto flex items-center gap-2 bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
          <Activity className="w-3 h-3" /> LIVE
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {cameras.map((cam) => (
          <div key={cam.id} className={`rounded-2xl overflow-hidden relative group aspect-video shadow-xl border-4 transition-colors ${isDarkMode ? 'bg-black border-white/10' : 'bg-black border-white'}`}>
            {/* Simulated Video Feed */}
            <video 
              src={cam.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-70"
            />
            
            {/* AI Overlays */}
            <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
              <div className="flex justify-between items-start">
                <div className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
                  <p className="text-white text-xs font-bold flex items-center gap-2">
                    <Shield className="w-3 h-3 text-blue-400" /> {cam.name}
                  </p>
                </div>
                <div className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
                  <p className="text-white text-[10px] font-mono">REC 00:42:15</p>
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div className="space-y-2">
                  <div className="bg-white/10 backdrop-blur-md p-2 rounded-lg border border-white/10">
                    <p className="text-white text-[10px] uppercase tracking-wider opacity-70">{t.emotionAnalysis}</p>
                    <p className={`text-sm font-bold ${cam.color}`}>{cam.emotion}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-2 rounded-lg border border-white/10">
                    <p className="text-white text-[10px] uppercase tracking-wider opacity-70">{t.peopleCount}</p>
                    <p className="text-white text-sm font-bold">{cam.count}</p>
                  </div>
                </div>
                <button className="p-2 bg-white/20 hover:bg-white/40 rounded-lg backdrop-blur-md transition-all pointer-events-auto">
                  <Maximize className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Scanning Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="w-full h-[2px] bg-blue-500/30 absolute top-0 animate-[scan_3s_linear_infinite]"></div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
}

const translations = {
  vi: {
    settings: "Cài đặt",
    exportData: "Xuất dữ liệu học sinh",
    exportDataDesc: "Tải xuống toàn bộ dữ liệu đánh giá và biên bản dưới dạng Excel.",
    exportFile: "Xuất file",
    cameraMonitoring: "Khung camera giám sát trực tiếp",
    cameraMonitoringDesc: "Kết nối với hệ thống camera AI để phân tích cảm xúc thời gian thực.",
    openCamera: "Mở camera",
    theme: "Chủ đề giao diện",
    themeDesc: "Chuyển đổi giữa chế độ Sáng và Tối.",
    language: "Ngôn ngữ",
    languageDesc: "Chọn ngôn ngữ hiển thị của hệ thống.",
    vietnamese: "Tiếng Việt",
    english: "Tiếng Anh",
    email: "Email",
    password: "Mật khẩu",
    // Sidebar
    overview: "Tổng quan",
    classes: "Lớp học",
    students: "Học sinh",
    reports: "Báo cáo",
    resources: "Nguồn tài nguyên",
    logout: "Đăng xuất",
    // Header
    dashboard: "Dashboard",
    searchPlaceholder: "Tìm kiếm...",
    notifications: "Thông báo",
    markAsRead: "Đánh dấu đã đọc",
    viewAllNotifications: "XEM TẤT CẢ THÔNG BÁO",
    // Dashboard
    studentClasses: "Lớp học sinh",
    newStudents: "Học sinh mới",
    newlyReported: "Mới báo cáo",
    mentalHealthOverview: "Tổng quan Sức khỏe Tinh thần Toàn trường",
    mentalHealth: "Sức khỏe tâm thần",
    wellbeingIndex: "Chỉ số Hạnh phúc",
    individualTimeline: "Dòng thời gian người dùng cá nhân",
    keywordClouds: "Đám mây từ khóa",
    aiEvidence: "Bằng chứng AI",
    realTimeNotifications: "Thông báo thời gian thực",
    grade: "Khối",
    level: "Mức độ:",
    stableStatus: "Giữ ổn định",
    stress: "Căng thẳng",
    anxiety: "Lo âu",
    depression: "Trầm cảm",
    academic: "Học tập",
    family: "Gia đình",
    friends: "Bạn bè",
    pressure: "Áp lực",
    fatigue: "Mệt mỏi",
    // Search Modal
    noToolsFound: "Không tìm thấy công cụ nào phù hợp với",
    clickToolToNavigate: "Nhấn vào công cụ để di chuyển nhanh",
    toolDashboardName: "Dashboard Tổng quan",
    toolDashboardDesc: "Xem số liệu thống kê và tình trạng học sinh",
    toolStudentsName: "Danh sách học sinh",
    toolStudentsDesc: "Quản lý thông tin và đánh giá học sinh",
    toolAlertsName: "Cảnh báo tâm lý",
    toolAlertsDesc: "Theo dõi các trường hợp cần can thiệp gấp",
    toolReportsName: "Báo cáo & Biên bản",
    toolReportsDesc: "Lưu trữ biên bản tham vấn và báo cáo định kỳ",
    toolResourcesName: "Nguồn tài nguyên",
    toolResourcesDesc: "Tài liệu chuyên môn và kỹ năng tham vấn",
    toolSettingsName: "Cài đặt hệ thống",
    toolSettingsDesc: "Cấu hình tài khoản, giao diện và xuất dữ liệu",
    toolCameraName: "Camera giám sát AI",
    toolCameraDesc: "Theo dõi trực tiếp và phân tích cảm xúc học sinh",
    // Notifications
    notifAppointment: "Lịch hẹn:",
    notifAlert: "Cảnh báo:",
    notifToday: "Hôm nay,",
    notifTomorrow: "Ngày mai,",
    notifMinsAgo: "phút trước",
    notifHoursAgo: "giờ trước",
    notifPeriodicCounseling: "Tham vấn tâm lý định kỳ.",
    notifAnxietyDetected: "Phát hiện biểu hiện lo âu cao qua Camera.",
    notifFollowUp: "Theo dõi sau can thiệp.",
    notifAbsence: "Vắng mặt không lý do 2 buổi liên tiếp.",
    // Reports Placeholders
    placeholderReason: "Ví dụ: Áp lực học tập, mâu thuẫn bạn bè...",
    placeholderContent: "Ghi chú lại những điểm chính đã trao đổi với học sinh...",
    placeholderProposal: "Các bước tiếp theo, lời khuyên hoặc hành động cần thực hiện...",
    // Camera Names & Emotions
    cam9A: "Lớp 9A - Phòng 101",
    cam9B: "Lớp 9B - Phòng 102",
    camLibrary: "Thư viện Trung tâm",
    camHallway: "Hành lang Chính",
    emotionFocused: "Tập trung",
    emotionHappy: "Vui vẻ",
    emotionQuiet: "Yên tĩnh",
    emotionNormal: "Bình thường",
    // Alert Detail Modal
    alertDetail: "Chi tiết Cảnh báo",
    interventionProposal: "Đề xuất Hành động Can thiệp",
    pros: "Ưu điểm:",
    cons: "Nhược điểm:",
    close: "Đóng",
    startIntervention: "Bắt đầu can thiệp",
    actionGreenText: "Duy trì các hoạt động ngoại khóa, giáo dục kỹ năng sống.",
    actionGreenPros: "Tăng cường sức khỏe tinh thần chủ động, xây dựng khả năng phục hồi và kỹ năng xã hội.",
    actionGreenCons: "Cần sự tham gia tự nguyện và kiên trì từ học sinh để thấy được hiệu quả lâu dài.",
    actionYellowText: "Chuyên viên tâm lý trường học gặp riêng để trò chuyện nhẹ nhàng.",
    actionYellowPros: "Phát hiện sớm các nút thắt tâm lý, tạo sự tin tưởng và hỗ trợ kịp thời trước khi vấn đề trở nên nghiêm trọng.",
    actionYellowCons: "Học sinh có thể cảm thấy e dè hoặc ngại ngùng trong lần đầu tiếp xúc.",
    actionOrangeText: "Thông báo cho gia đình, lập kế hoạch hỗ trợ tâm lý 1-1.",
    actionOrangePros: "Huy động nguồn lực hỗ trợ toàn diện từ gia đình, có lộ trình can thiệp cá nhân hóa rõ ràng.",
    actionOrangeCons: "Cần sự phối hợp chặt chẽ và thấu hiểu từ phụ huynh, tránh gây thêm áp lực cho học sinh.",
    actionRedText: "Kích hoạt quy trình khẩn cấp, kết nối ngay với bác sĩ tâm thần.",
    actionRedPros: "Đảm bảo an toàn tính mạng, can thiệp y tế chuyên sâu cho các tình trạng cấp bách.",
    actionRedCons: "Có thể gây sốc tâm lý tạm thời cho gia đình và học sinh, cần sự tế nhị cực cao trong giao tiếp.",
    // Student List
    studentList: "Danh sách Học sinh",
    allStudents: "Tất cả học sinh",
    uploadOtherFile: "Tải lên file khác",
    uploadSuccess: "Danh sách học sinh đã được tải lên thành công.",
    processingData: "Hệ thống đang xử lý dữ liệu...",
    importStudentList: "Nhập danh sách học sinh",
    uploadXlsxDesc: "Tải lên file .xlsx chứa danh sách học sinh của trường để bắt đầu theo dõi.",
    selectXlsx: "Chọn file .xlsx",
    // Alerts
    studentAlerts: "Cảnh báo Học sinh",
    followUpList: "Danh sách theo dõi (Xanh, Vàng, Cam, Đỏ)",
    student: "Học sinh",
    alertLevel: "Mức độ cảnh báo",
    status: "Trạng thái",
    action: "Hành động",
    viewDetails: "Xem chi tiết",
    alertRed: "Cảnh báo Đỏ",
    alertOrange: "Cảnh báo Cam",
    alertYellow: "Cảnh báo Vàng",
    stable: "Ổn định",
    // Statuses
    monitoring: "Theo dõi thêm",
    arrangeMeeting: "Sắp xếp gặp mặt",
    interventionNeeded: "Cần can thiệp",
    mediumRisk: "Rủi ro trung bình",
    // Reports
    reportsAndMinutes: "Báo cáo & Biên bản",
    recentMinutes: "Biên bản gặp gỡ học sinh gần đây",
    createNewMinute: "+ Tạo biên bản mới",
    studentName: "Học sinh",
    meetingDate: "Ngày gặp",
    reason: "Lý do gặp gỡ / Vấn đề chính",
    content: "Nội dung trao đổi chi tiết",
    proposal: "Đề xuất / Hướng giải quyết",
    responsible: "Phụ trách",
    cancel: "Hủy bỏ",
    saveMinute: "Lưu biên bản",
    edit: "Chỉnh sửa",
    monitoringStatus: "Đang theo dõi",
    completedStatus: "Đã hoàn thành",
    urgentIntervention: "Cần can thiệp khẩn cấp",
    summaryContent: "Nội dung tóm tắt:",
    viewDetailsBtn: "Xem chi tiết",
    editBtn: "Chỉnh sửa",
    // Resources
    uploadDocument: "Tải tài liệu lên",
    professionalDocs: "Tài liệu chuyên môn",
    counselingSkills: "Kỹ năng tham vấn",
    caseHandling: "Xử lý tình huống",
    professionalDocsDesc: "Các nghiên cứu, cẩm nang và hướng dẫn chẩn đoán.",
    counselingSkillsDesc: "Tài liệu đào tạo kỹ năng giao tiếp và thấu cảm.",
    caseHandlingDesc: "Quy trình chuẩn để xử lý các ca khủng hoảng.",
    featuredDocs: "Tài liệu nổi bật",
    searchDocs: "Tìm kiếm tài liệu...",
    docName: "Tên tài liệu",
    category: "Danh mục",
    format: "Định dạng",
    noDocsFound: "Không tìm thấy tài liệu nào phù hợp.",
    confirmDeleteDoc: "Bạn có chắc chắn muốn xóa tài liệu này?",
    uploadSuccessMsg: "Đã tải lên thành công: ",
    // Camera
    cameraSystem: "Hệ thống Giám sát Camera AI",
    emotionAnalysis: "Phân tích cảm xúc",
    peopleCount: "Số người",
    // Login
    login: "ĐĂNG NHẬP",
    forgotPassword: "Quên mật khẩu?",
    mentalHealthSystem: "Hệ thống quản lý sức khỏe tâm thần học đường",
  },
  en: {
    settings: "Settings",
    exportData: "Export Student Data",
    exportDataDesc: "Download all assessment data and reports as Excel.",
    exportFile: "Export File",
    cameraMonitoring: "Live Camera Monitoring",
    cameraMonitoringDesc: "Connect to AI camera system for real-time emotion analysis.",
    openCamera: "Open Camera",
    theme: "Interface Theme",
    themeDesc: "Switch between Light and Dark mode.",
    language: "Language",
    languageDesc: "Select the system display language.",
    vietnamese: "Vietnamese",
    english: "English",
    email: "Email",
    password: "Password",
    // Sidebar
    overview: "Overview",
    classes: "Classes",
    students: "Students",
    reports: "Reports",
    resources: "Resources",
    logout: "Logout",
    // Header
    dashboard: "Dashboard",
    searchPlaceholder: "Search...",
    notifications: "Notifications",
    markAsRead: "Mark as read",
    viewAllNotifications: "VIEW ALL NOTIFICATIONS",
    // Dashboard
    studentClasses: "Student Classes",
    newStudents: "New Students",
    newlyReported: "Newly reported",
    mentalHealthOverview: "School-wide Mental Health Overview",
    mentalHealth: "Mental Health",
    wellbeingIndex: "Well-being Index",
    individualTimeline: "Individual user timeline",
    keywordClouds: "Keyword clouds",
    aiEvidence: "AI Evidence",
    realTimeNotifications: "Real time notifications",
    grade: "Grade",
    level: "Level:",
    stableStatus: "Stable",
    stress: "Stress",
    anxiety: "Anxiety",
    depression: "Depression",
    academic: "Academic",
    family: "Family",
    friends: "Friends",
    pressure: "Pressure",
    fatigue: "Fatigue",
    // Search Modal
    noToolsFound: "No tools found matching",
    clickToolToNavigate: "Click on a tool to move quickly",
    toolDashboardName: "Overview Dashboard",
    toolDashboardDesc: "View statistics and student status",
    toolStudentsName: "Student List",
    toolStudentsDesc: "Manage student information and assessment",
    toolAlertsName: "Psychological Alerts",
    toolAlertsDesc: "Monitor cases requiring urgent intervention",
    toolReportsName: "Reports & Minutes",
    toolReportsDesc: "Store counseling minutes and periodic reports",
    toolResourcesName: "Resources",
    toolResourcesDesc: "Professional documents and counseling skills",
    toolSettingsName: "System Settings",
    toolSettingsDesc: "Configure account, interface and export data",
    toolCameraName: "AI Camera Monitoring",
    toolCameraDesc: "Live monitoring and student emotion analysis",
    // Notifications
    notifAppointment: "Appointment:",
    notifAlert: "Alert:",
    notifToday: "Today,",
    notifTomorrow: "Tomorrow,",
    notifMinsAgo: "mins ago",
    notifHoursAgo: "hours ago",
    notifPeriodicCounseling: "Periodic psychological counseling.",
    notifAnxietyDetected: "High anxiety detected via Camera.",
    notifFollowUp: "Post-intervention follow-up.",
    notifAbsence: "Unexcused absence for 2 consecutive sessions.",
    // Reports Placeholders
    placeholderReason: "Example: Academic pressure, friend conflict...",
    placeholderContent: "Note down the main points discussed with the student...",
    placeholderProposal: "Next steps, advice or actions to be taken...",
    // Camera Names & Emotions
    cam9A: "Class 9A - Room 101",
    cam9B: "Class 9B - Room 102",
    camLibrary: "Central Library",
    camHallway: "Main Hallway",
    emotionFocused: "Focused",
    emotionHappy: "Happy",
    emotionQuiet: "Quiet",
    emotionNormal: "Normal",
    // Alert Detail Modal
    alertDetail: "Alert Detail",
    interventionProposal: "Intervention Action Proposal",
    pros: "Pros:",
    cons: "Cons:",
    close: "Close",
    startIntervention: "Start Intervention",
    actionGreenText: "Maintain extracurricular activities, life skills education.",
    actionGreenPros: "Proactively enhance mental health, build resilience and social skills.",
    actionGreenCons: "Requires voluntary and persistent participation from students for long-term effectiveness.",
    actionYellowText: "School psychologist meets privately for a gentle conversation.",
    actionYellowPros: "Early detection of psychological knots, building trust and providing timely support before issues escalate.",
    actionYellowCons: "Students may feel shy or hesitant during the first contact.",
    actionOrangeText: "Notify family, create a 1-on-1 psychological support plan.",
    actionOrangePros: "Mobilize comprehensive support from family, with a clear personalized intervention roadmap.",
    actionOrangeCons: "Requires close coordination and understanding from parents, avoiding additional pressure on students.",
    actionRedText: "Activate emergency procedures, immediately connect with a psychiatrist.",
    actionRedPros: "Ensure safety of life, provide intensive medical intervention for urgent conditions.",
    actionRedCons: "May cause temporary psychological shock to family and students, requires extreme sensitivity in communication.",
    // Student List
    studentList: "Student List",
    allStudents: "All Students",
    uploadOtherFile: "Upload another file",
    uploadSuccess: "Student list uploaded successfully.",
    processingData: "System is processing data...",
    importStudentList: "Import Student List",
    uploadXlsxDesc: "Upload .xlsx file containing student list to start tracking.",
    selectXlsx: "Select .xlsx file",
    // Alerts
    studentAlerts: "Student Alerts",
    followUpList: "Follow-up list (Green, Yellow, Orange, Red)",
    student: "Student",
    alertLevel: "Alert Level",
    status: "Status",
    action: "Action",
    viewDetails: "View Details",
    alertRed: "Red Alert",
    alertOrange: "Orange Alert",
    alertYellow: "Yellow Alert",
    stable: "Stable",
    // Statuses
    monitoring: "Further monitoring",
    arrangeMeeting: "Arrange meeting",
    interventionNeeded: "Intervention needed",
    mediumRisk: "Medium risk",
    // Reports
    reportsAndMinutes: "Reports & Minutes",
    recentMinutes: "Recent student meeting minutes",
    createNewMinute: "+ Create new minute",
    studentName: "Student",
    meetingDate: "Meeting Date",
    reason: "Reason for meeting / Main issue",
    content: "Detailed discussion content",
    proposal: "Proposal / Solution",
    responsible: "Responsible",
    cancel: "Cancel",
    saveMinute: "Save minute",
    edit: "Edit",
    monitoringStatus: "Monitoring",
    completedStatus: "Completed",
    urgentIntervention: "Urgent intervention needed",
    summaryContent: "Summary content:",
    viewDetailsBtn: "View details",
    editBtn: "Edit",
    // Resources
    uploadDocument: "Upload document",
    professionalDocs: "Professional Documents",
    counselingSkills: "Counseling Skills",
    caseHandling: "Case Handling",
    professionalDocsDesc: "Research, handbooks, and diagnostic guides.",
    counselingSkillsDesc: "Communication and empathy skills training materials.",
    caseHandlingDesc: "Standard procedures for handling crisis cases.",
    featuredDocs: "Featured Documents",
    searchDocs: "Search documents...",
    docName: "Document Name",
    category: "Category",
    format: "Format",
    noDocsFound: "No matching documents found.",
    confirmDeleteDoc: "Are you sure you want to delete this document?",
    uploadSuccessMsg: "Uploaded successfully: ",
    // Camera
    cameraSystem: "AI Camera Monitoring System",
    emotionAnalysis: "Emotion Analysis",
    peopleCount: "People Count",
    // Login
    login: "LOGIN",
    forgotPassword: "Forgot password?",
    mentalHealthSystem: "School mental health management system",
  }
};

function SettingsView({ onNavigate, isDarkMode, setIsDarkMode, language, setLanguage, students }: { 
  onNavigate: (view: string) => void, 
  isDarkMode: boolean, 
  setIsDarkMode: (val: boolean) => void,
  language: string,
  setLanguage: (val: string) => void,
  students: any[]
}) {
  const t = translations[language as keyof typeof translations];
  const handleExportExcel = () => {
    // Prepare Student Data
    const studentData = students.map(s => ({
      'ID': s.id,
      'Họ và tên': s.name,
      'Chỉ số Hạnh phúc': s.wellbeing,
      'Trạng thái': s.status
    }));

    // Prepare Report Data
    const reportData = meetingReports.map(r => ({
      'ID': r.id,
      'Học sinh': r.studentName,
      'Lớp': r.class,
      'Ngày gặp': r.date,
      'Người phụ trách': r.counselor,
      'Nội dung tóm tắt': r.summary,
      'Trạng thái': r.status
    }));

    // Create Workbook
    const wb = utils.book_new();

    // Add Student Sheet
    const wsStudents = utils.json_to_sheet(studentData);
    utils.book_append_sheet(wb, wsStudents, "Danh sách Học sinh");

    // Add Report Sheet
    const wsReports = utils.json_to_sheet(reportData);
    utils.book_append_sheet(wb, wsReports, "Biên bản Tham vấn");

    // Save File
    writeFile(wb, "Du_lieu_Hoc_sinh_Koufuku.xlsx");
  };

  return (
    <div className="flex-1 overflow-auto p-8">
      <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{t.settings}</h2>
      
      <div className={`rounded-2xl p-6 shadow-sm max-w-3xl transition-colors duration-300 ${isDarkMode ? 'bg-[#121212] border border-white/10' : 'bg-white'}`}>
        <div className="space-y-6">
          
          {/* Export Data */}
          <div className={`flex items-center justify-between p-4 border rounded-xl transition-colors ${isDarkMode ? 'border-white/10 hover:bg-white/5' : 'border-gray-100 hover:bg-gray-50'}`}>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{t.exportData}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{t.exportDataDesc}</p>
              </div>
            </div>
            <button 
              onClick={handleExportExcel}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isDarkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-[#dceaea] text-gray-800 hover:bg-[#cce6e6]'}`}
            >
              {t.exportFile}
            </button>
          </div>

          {/* Camera Monitoring */}
          <div className={`flex items-center justify-between p-4 border rounded-xl transition-colors ${isDarkMode ? 'border-white/10 hover:bg-white/5' : 'border-gray-100 hover:bg-gray-50'}`}>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-50 text-purple-600'}`}>
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{t.cameraMonitoring}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{t.cameraMonitoringDesc}</p>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('camera')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isDarkMode ? 'bg-purple-900/50 text-purple-200 hover:bg-purple-900/70' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'}`}
            >
              {t.openCamera}
            </button>
          </div>

          {/* Theme Toggle */}
          <div className={`flex items-center justify-between p-4 border rounded-xl transition-colors ${isDarkMode ? 'border-white/10 hover:bg-white/5' : 'border-gray-100 hover:bg-gray-50'}`}>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-orange-900/30 text-orange-400' : 'bg-orange-50 text-orange-600'}`}>
                {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </div>
              <div>
                <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{t.theme}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{t.themeDesc}</p>
              </div>
            </div>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              style={{ backgroundColor: isDarkMode ? '#3b82f6' : '#e5e7eb' }}
            >
              <span 
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}`}
              />
            </button>
          </div>

          {/* Language Switch */}
          <div className={`flex items-center justify-between p-4 border rounded-xl transition-colors ${isDarkMode ? 'border-white/10 hover:bg-white/5' : 'border-gray-100 hover:bg-gray-50'}`}>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-50 text-green-600'}`}>
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{t.language}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{t.languageDesc}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setLanguage('vi')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${language === 'vi' ? 'bg-[#d4af37] text-[#0a192f] shadow-md' : (isDarkMode ? 'bg-white/5 text-gray-400 hover:bg-white/10' : 'bg-gray-100 text-gray-500 hover:bg-gray-200')}`}
              >
                {t.vietnamese}
              </button>
              <button 
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${language === 'en' ? 'bg-[#d4af37] text-[#0a192f] shadow-md' : (isDarkMode ? 'bg-white/5 text-gray-400 hover:bg-white/10' : 'bg-gray-100 text-gray-500 hover:bg-gray-200')}`}
              >
                {t.english}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

const mentalHealthData = [
  { name: 'Mon', value: 35 },
  { name: 'Tue', value: 25 },
  { name: 'Wed', value: 30 },
  { name: 'Thu', value: 20 },
  { name: 'Fri', value: 25 },
  { name: 'Sat', value: 15 },
  { name: 'Sun', value: 20 },
];

const timelineData = [
  { name: 'Jan', value: 50 },
  { name: 'Feb', value: 30 },
  { name: 'Mar', value: 45 },
  { name: 'Apr', value: 20 },
  { name: 'May', value: 40 },
  { name: 'Jun', value: 15 },
  { name: 'Jul', value: 35 },
];

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('vi');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Default to true for now as per previous request 4
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [selectedAction, setSelectedAction] = useState<number | null>(null);
  const [students, setStudents] = useState(INITIAL_STUDENTS);

  const t = translations[language as keyof typeof translations];

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('dashboard');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail && loginPassword) {
      setIsLoggedIn(true);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${isDarkMode ? 'bg-black' : 'bg-[#f0f2f5]'}`}>
        <div className={`w-full max-w-md rounded-3xl p-8 shadow-2xl transition-colors duration-300 ${isDarkMode ? 'bg-[#121212] border border-white/10' : 'bg-white'}`}>
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#f9d423] rounded-2xl flex items-center justify-center shadow-lg">
              <Shield className="w-10 h-10 text-[#0a192f]" />
            </div>
          </div>
          <h1 className={`text-3xl font-black text-center mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Koufuku</h1>
          <p className={`text-center mb-8 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{t.mentalHealthSystem}</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.email}</label>
              <input 
                type="email" 
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl outline-none transition-all border ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-[#d4af37]' : 'bg-gray-50 border-gray-200 focus:border-[#d4af37]'}`}
                placeholder="admin@school.edu.vn"
              />
            </div>
            <div>
              <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.password}</label>
              <input 
                type="password" 
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl outline-none transition-all border ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-[#d4af37]' : 'bg-gray-50 border-gray-200 focus:border-[#d4af37]'}`}
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#d4af37] to-[#f9d423] text-[#0a192f] font-black rounded-xl shadow-lg shadow-[#d4af37]/20 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4"
            >
              {t.login}
            </button>
          </form>
          
          <div className="mt-8 flex items-center justify-between">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full transition-colors ${isDarkMode ? 'bg-white/5 text-orange-400' : 'bg-gray-100 text-orange-600'}`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <a href="#" className="text-sm font-medium text-[#d4af37] hover:underline">{t.forgotPassword}</a>
          </div>
        </div>
      </div>
    );
  }

  const notifications = [
    { id: 1, type: 'appointment', title: `${t.notifAppointment} Trần Thị Bình (9B)`, time: `${t.notifToday} 14:30`, description: t.notifPeriodicCounseling, status: 'upcoming' },
    { id: 2, type: 'alert', title: `${t.notifAlert} Lê Văn Cường (9A)`, time: `10 ${t.notifMinsAgo}`, description: t.notifAnxietyDetected, status: 'urgent' },
    { id: 3, type: 'appointment', title: `${t.notifAppointment} Nguyễn Văn An (9A)`, time: `${t.notifTomorrow} 09:00`, description: t.notifFollowUp, status: 'upcoming' },
    { id: 4, type: 'alert', title: `${t.notifAlert} Phạm Minh Tuấn (9B)`, time: `2 ${t.notifHoursAgo}`, description: t.notifAbsence, status: 'normal' },
  ];

  const tools = [
    { id: 'dashboard', name: t.toolDashboardName, icon: <Home className="w-4 h-4" />, description: t.toolDashboardDesc },
    { id: 'students', name: t.toolStudentsName, icon: <Users className="w-4 h-4" />, description: t.toolStudentsDesc },
    { id: 'alerts', name: t.toolAlertsName, icon: <AlertTriangle className="w-4 h-4" />, description: t.toolAlertsDesc },
    { id: 'reports', name: t.toolReportsName, icon: <FileText className="w-4 h-4" />, description: t.toolReportsDesc },
    { id: 'resources', name: t.toolResourcesName, icon: <BookOpen className="w-4 h-4" />, description: t.toolResourcesDesc },
    { id: 'settings', name: t.toolSettingsName, icon: <Settings className="w-4 h-4" />, description: t.toolSettingsDesc },
    { id: 'camera', name: t.toolCameraName, icon: <Video className="w-4 h-4" />, description: t.toolCameraDesc },
  ];

  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`flex h-screen font-sans overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-black text-white' : 'bg-[#f0f2f5] text-gray-800'}`}>
      {/* Mobile Bottom Navigation */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around px-2 py-3 border-t transition-colors duration-300 ${isDarkMode ? 'bg-[#121212] border-white/10' : 'bg-white border-gray-200 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]'}`}>
        <button 
          onClick={() => setCurrentView('dashboard')}
          className={`flex flex-col items-center gap-1 transition-colors ${currentView === 'dashboard' ? 'text-[#d4af37]' : 'text-gray-400'}`}
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-medium">{t.overview}</span>
        </button>
        <button 
          onClick={() => setCurrentView('students')}
          className={`flex flex-col items-center gap-1 transition-colors ${currentView === 'students' ? 'text-[#d4af37]' : 'text-gray-400'}`}
        >
          <Users className="w-6 h-6" />
          <span className="text-[10px] font-medium">{t.students}</span>
        </button>
        <button 
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center gap-1 text-gray-400"
        >
          <div className="w-12 h-12 rounded-full bg-[#d4af37] flex items-center justify-center -mt-8 shadow-lg shadow-[#d4af37]/30 text-white">
            <Search className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-medium mt-1">{t.searchPlaceholder.replace('...', '')}</span>
        </button>
        <button 
          onClick={() => setCurrentView('alerts')}
          className={`flex flex-col items-center gap-1 transition-colors ${currentView === 'alerts' ? 'text-[#d4af37]' : 'text-gray-400'}`}
        >
          <AlertTriangle className="w-6 h-6" />
          <span className="text-[10px] font-medium">{t.studentAlerts.split(' ')[0]}</span>
        </button>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className={`flex flex-col items-center gap-1 transition-colors ${isMobileMenuOpen ? 'text-[#d4af37]' : 'text-gray-400'}`}
        >
          <Menu className="w-6 h-6" />
          <span className="text-[10px] font-medium">{t.languageDesc.split(' ')[0]}</span>
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div 
            className={`absolute right-0 top-0 bottom-0 w-72 shadow-2xl transition-colors duration-300 ${isDarkMode ? 'bg-[#121212]' : 'bg-white'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 flex items-center justify-between border-b border-white/5">
              <h2 className="text-2xl font-bold text-[#3b82f6]">Menu</h2>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-full hover:bg-white/5">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 space-y-2">
              <button 
                onClick={() => { setCurrentView('reports'); setIsMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-4 p-4 rounded-xl transition-colors ${currentView === 'reports' ? (isDarkMode ? 'bg-white/10 text-white' : 'bg-blue-50 text-blue-600') : (isDarkMode ? 'text-gray-400 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-50')}`}
              >
                <FileText className="w-5 h-5" />
                <span className="font-medium">{t.reportsAndMinutes}</span>
              </button>
              <button 
                onClick={() => { setCurrentView('resources'); setIsMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-4 p-4 rounded-xl transition-colors ${currentView === 'resources' ? (isDarkMode ? 'bg-white/10 text-white' : 'bg-blue-50 text-blue-600') : (isDarkMode ? 'text-gray-400 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-50')}`}
              >
                <BookOpen className="w-5 h-5" />
                <span className="font-medium">{t.resources}</span>
              </button>
              <button 
                onClick={() => { setCurrentView('camera'); setIsMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-4 p-4 rounded-xl transition-colors ${currentView === 'camera' ? (isDarkMode ? 'bg-white/10 text-white' : 'bg-blue-50 text-blue-600') : (isDarkMode ? 'text-gray-400 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-50')}`}
              >
                <Video className="w-5 h-5" />
                <span className="font-medium">{t.cameraSystem.split(' ')[0]} AI</span>
              </button>
              <button 
                onClick={() => { setCurrentView('settings'); setIsMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-4 p-4 rounded-xl transition-colors ${currentView === 'settings' ? (isDarkMode ? 'bg-white/10 text-white' : 'bg-blue-50 text-blue-600') : (isDarkMode ? 'text-gray-400 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-50')}`}
              >
                <Settings className="w-5 h-5" />
                <span className="font-medium">{t.settings}</span>
              </button>
              <div className="pt-4 border-t border-white/5">
                <div className="flex items-center justify-between p-4">
                  <span className={`font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t.theme}</span>
                  <button 
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`w-12 h-6 rounded-full relative transition-colors ${isDarkMode ? 'bg-blue-600' : 'bg-gray-300'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isDarkMode ? 'left-7' : 'left-1'}`}></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-sm">
          <div 
            className={`w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-[#1a1a1a] border border-white/10' : 'bg-white'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`flex items-center px-6 py-4 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
              <Search className="w-5 h-5 text-gray-400 mr-4" />
              <input 
                autoFocus
                type="text" 
                placeholder={t.searchDocs} 
                className={`flex-1 bg-transparent border-none outline-none text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setIsSearchOpen(false);
                }}
              />
              <button 
                onClick={() => setIsSearchOpen(false)}
                className={`px-2 py-1 rounded text-xs font-medium ${isDarkMode ? 'bg-white/10 text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-500 hover:text-gray-700'}`}
              >
                ESC
              </button>
            </div>
            <div className="max-h-[400px] overflow-y-auto p-2">
              {filteredTools.length > 0 ? (
                <div className="space-y-1">
                  {filteredTools.map(tool => (
                    <button
                      key={tool.id}
                      onClick={() => {
                        setCurrentView(tool.id);
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-colors ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-white/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                        {tool.icon}
                      </div>
                      <div>
                        <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{tool.name}</div>
                        <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{tool.description}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 ml-auto text-gray-300" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-gray-500">
                  {t.noToolsFound} "{searchQuery}"
                </div>
              )}
            </div>
            <div className={`px-6 py-3 border-t text-[10px] uppercase tracking-widest font-bold ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-500' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
              {t.clickToolToNavigate}
            </div>
          </div>
          <div className="fixed inset-0 -z-10" onClick={() => setIsSearchOpen(false)}></div>
        </div>
      )}

      {/* Sidebar (Desktop) */}
      <aside className={`hidden lg:flex w-64 flex-col shadow-sm z-10 transition-colors duration-300 ${isDarkMode ? 'bg-[#0a192f] border-r border-white/10' : 'bg-[#0a192f]'}`}>
        <div className="p-8 flex justify-center">
          <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#f9d423] rounded-xl flex items-center justify-center shadow-lg">
            <Shield className="w-8 h-8 text-[#0a192f]" />
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
              currentView === 'dashboard' 
                ? 'bg-gradient-to-r from-[#d4af37] to-[#f9d423] text-[#0a192f] shadow-md' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Home className={`w-5 h-5 ${currentView === 'dashboard' ? 'text-[#0a192f]' : 'text-gray-400'}`} />
            {t.overview}
          </button>
          <button 
            onClick={() => setCurrentView('students')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
              currentView === 'students' 
                ? 'bg-gradient-to-r from-[#d4af37] to-[#f9d423] text-[#0a192f] shadow-md' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Users className={`w-5 h-5 ${currentView === 'students' ? 'text-[#0a192f]' : 'text-gray-400'}`} />
            {t.classes}
          </button>
          <button 
            onClick={() => setCurrentView('alerts')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
              currentView === 'alerts' 
                ? 'bg-gradient-to-r from-[#d4af37] to-[#f9d423] text-[#0a192f] shadow-md' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Smile className={`w-5 h-5 ${currentView === 'alerts' ? 'text-[#0a192f]' : 'text-gray-400'}`} />
            {t.students}
          </button>
          <button 
            onClick={() => setCurrentView('reports')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
              currentView === 'reports' 
                ? 'bg-gradient-to-r from-[#d4af37] to-[#f9d423] text-[#0a192f] shadow-md' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Activity className={`w-5 h-5 ${currentView === 'reports' ? 'text-[#0a192f]' : 'text-gray-400'}`} />
            {t.reports}
          </button>
          <button 
            onClick={() => setCurrentView('resources')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
              currentView === 'resources' 
                ? 'bg-gradient-to-r from-[#d4af37] to-[#f9d423] text-[#0a192f] shadow-md' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <BookOpen className={`w-5 h-5 ${currentView === 'resources' ? 'text-[#0a192f]' : 'text-gray-400'}`} />
            {t.resources}
          </button>
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <button 
            onClick={() => setCurrentView('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
              currentView === 'settings' 
                ? 'bg-gradient-to-r from-[#d4af37] to-[#f9d423] text-[#0a192f] shadow-md' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Settings className={`w-5 h-5 ${currentView === 'settings' ? 'text-[#0a192f]' : 'text-gray-400'}`} />
            {t.settings}
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-400 hover:bg-red-400/10 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            {t.logout}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden pb-16 lg:pb-0">
        {/* Top Header */}
        <header className={`h-16 flex items-center justify-between px-4 lg:px-8 border-b transition-colors duration-300 ${isDarkMode ? 'bg-[#121212] border-white/10' : 'bg-white border-gray-100'}`}>
          <div className="flex items-center gap-4">
            <div className="lg:hidden">
              <div className="w-8 h-8 bg-gradient-to-br from-[#d4af37] to-[#f9d423] rounded-lg flex items-center justify-center shadow-md">
                <Shield className="w-5 h-5 text-[#0a192f]" />
              </div>
            </div>
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{t.dashboard}</h2>
          </div>

          <div className="flex items-center gap-2 lg:gap-6">
            <div className={`hidden md:flex items-center px-4 py-2 rounded-full transition-colors ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder={t.searchPlaceholder} 
                className="bg-transparent border-none outline-none text-sm w-48"
              />
            </div>
            
            <button className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}>
              <MessageSquare className="w-5 h-5" />
            </button>

            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`relative p-2 rounded-full transition-colors ${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              
              {isNotificationsOpen && (
                <div className={`absolute right-0 mt-2 w-80 rounded-2xl shadow-2xl z-50 overflow-hidden border transition-colors duration-300 ${isDarkMode ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-gray-100'}`}>
                  <div className={`px-4 py-3 border-b flex justify-between items-center ${isDarkMode ? 'border-white/5 bg-white/5' : 'border-gray-50 bg-gray-50'}`}>
                    <h3 className="font-bold text-sm">{t.notifications}</h3>
                    <button className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">{t.markAsRead}</button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map(notif => (
                      <div key={notif.id} className={`p-4 border-b last:border-0 transition-colors ${isDarkMode ? 'border-white/5 hover:bg-white/5' : 'border-gray-50 hover:bg-gray-50'}`}>
                        <div className="flex gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${notif.status === 'urgent' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                            {notif.type === 'alert' ? <AlertTriangle className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
                          </div>
                          <div>
                            <div className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{notif.title}</div>
                            <div className="text-[10px] text-gray-400 mt-0.5">{notif.time}</div>
                            <div className="text-xs text-gray-500 mt-1 line-clamp-2">{notif.description}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className={`w-full py-3 text-xs font-bold text-center transition-colors ${isDarkMode ? 'text-gray-400 hover:text-white bg-white/5' : 'text-gray-500 hover:text-gray-800 bg-gray-50'}`}>
                    {t.viewAllNotifications}
                  </button>
                </div>
              )}
            </div>

            <button className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 transition-transform hover:scale-110">
              <img 
                src="https://picsum.photos/seed/baominh/40/40" 
                alt="Bảo Minh" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        {currentView === 'dashboard' ? (
        <div className="flex-1 overflow-auto p-4 lg:p-8 space-y-6">
          {/* Top Row: Stats & Heatmap */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Summary Cards */}
            <div className="lg:col-span-3 flex flex-col gap-6">
              <div className="bg-gradient-to-br from-[#d4af37] to-[#f9d423] rounded-2xl p-6 shadow-lg text-[#0a192f] relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <span className="text-sm font-bold uppercase tracking-wider opacity-80">{t.studentClasses}</span>
                  <div className="text-4xl font-black mt-2">98</div>
                  <div className="text-xs mt-4 font-medium px-2 py-1 bg-[#0a192f]/10 rounded-lg inline-block">{t.stableStatus}</div>
                </div>
                <Smile className="absolute bottom-4 right-4 w-12 h-12 opacity-20" />
              </div>
              
              <div className={`rounded-2xl p-6 shadow-sm transition-colors relative overflow-hidden group ${isDarkMode ? 'bg-[#1a1a1a] border border-white/10' : 'bg-white'}`}>
                <div className="relative z-10">
                  <span className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{t.newStudents}</span>
                  <div className="text-4xl font-black mt-2">97</div>
                  <div className={`text-xs mt-4 font-medium px-2 py-1 rounded-lg inline-block ${isDarkMode ? 'bg-white/5 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>{t.newlyReported}</div>
                </div>
                <AlertTriangle className="absolute top-4 right-4 w-6 h-6 text-[#d4af37]" />
              </div>
            </div>

            {/* Heatmap Matrix */}
            <div className={`lg:col-span-9 rounded-2xl p-6 shadow-sm transition-colors ${isDarkMode ? 'bg-[#1a1a1a] border border-white/10' : 'bg-white'}`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{t.mentalHealthOverview}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{t.level}</span>
                  <div className="flex h-2 w-24 rounded-full overflow-hidden">
                    <div className="flex-1 bg-yellow-200"></div>
                    <div className="flex-1 bg-orange-300"></div>
                    <div className="flex-1 bg-red-400"></div>
                    <div className="flex-1 bg-red-600"></div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`aspect-square rounded-md flex items-center justify-center transition-all hover:scale-110 cursor-pointer ${
                      i % 7 === 0 ? 'bg-red-500/80' : 
                      i % 5 === 0 ? 'bg-orange-400/60' : 
                      i % 3 === 0 ? 'bg-yellow-300/40' : 'bg-yellow-100/20'
                    }`}
                  >
                    {i % 8 === 0 && <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <span>{t.grade} 6</span>
                <span>{t.grade} 7</span>
                <span>{t.grade} 8</span>
                <span>{t.grade} 9</span>
                <span>{t.grade} 10</span>
                <span>{t.grade} 11</span>
                <span>{t.grade} 12</span>
              </div>
            </div>
          </div>

          {/* Middle Row: Line Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className={`lg:col-span-4 rounded-2xl p-6 shadow-sm transition-colors ${isDarkMode ? 'bg-[#1a1a1a] border border-white/10' : 'bg-white'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{t.mentalHealth}</h3>
              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mentalHealthData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#d4af37" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="value" stroke="#d4af37" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ backgroundColor: isDarkMode ? '#1a1a1a' : '#fff', border: 'none', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      itemStyle={{ color: '#d4af37' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-gray-400 font-medium">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>

            <div className={`lg:col-span-8 rounded-2xl p-6 shadow-sm transition-colors ${isDarkMode ? 'bg-[#1a1a1a] border border-white/10' : 'bg-white'}`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{t.individualTimeline}</h3>
                <MoreHorizontal className="w-5 h-5 text-gray-400" />
              </div>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} />
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ backgroundColor: isDarkMode ? '#1a1a1a' : '#fff', border: 'none', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      itemStyle={{ color: '#d4af37' }}
                    />
                    <Line type="monotone" dataKey="value" stroke="#d4af37" strokeWidth={3} dot={{ fill: '#d4af37', r: 4 }} activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-gray-400 font-medium">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
              </div>
            </div>
          </div>

          {/* Bottom Row: Keywords & Notifications */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className={`lg:col-span-4 rounded-2xl p-6 shadow-sm transition-colors ${isDarkMode ? 'bg-[#1a1a1a] border border-white/10' : 'bg-white'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{t.keywordClouds}</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'stress', label: t.stress },
                  { key: 'anxiety', label: t.anxiety },
                  { key: 'depression', label: t.depression },
                  { key: 'academic', label: t.academic },
                  { key: 'family', label: t.family },
                  { key: 'friends', label: t.friends },
                  { key: 'pressure', label: t.pressure },
                  { key: 'fatigue', label: t.fatigue }
                ].map(tag => (
                  <span key={tag.key} className={`px-3 py-1 rounded-full text-xs font-medium ${isDarkMode ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
                    {tag.label}
                  </span>
                ))}
              </div>
              
              <h3 className={`text-lg font-bold mt-8 mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{t.aiEvidence}</h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="aspect-square rounded-xl bg-gray-200 overflow-hidden">
                  <img src="https://picsum.photos/seed/ai1/100/100" alt="AI Evidence" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square rounded-xl bg-gray-100 flex items-center justify-center">
                  <Upload className="w-5 h-5 text-gray-400" />
                </div>
                <div className="aspect-square rounded-xl bg-gray-100 flex items-center justify-center">
                  <Upload className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className={`lg:col-span-8 rounded-2xl p-6 shadow-sm transition-colors ${isDarkMode ? 'bg-[#1a1a1a] border border-white/10' : 'bg-white'}`}>
              <h3 className={`text-lg font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{t.realTimeNotifications}</h3>
              <div className="space-y-4">
                {[
                  { name: 'Nguyễn Văn A (9A)', status: language === 'vi' ? 'Cảnh báo Đỏ' : 'Red Alert', time: '2m ago', level: 'red' },
                  { name: 'Trần Thị B (9B)', status: language === 'vi' ? 'Cảnh báo Cam' : 'Orange Alert', time: '5m ago', level: 'orange' },
                  { name: 'Lê Văn C (9A)', status: language === 'vi' ? 'Cảnh báo Vàng' : 'Yellow Alert', time: '12m ago', level: 'yellow' },
                  { name: 'Phạm Minh D (9B)', status: language === 'vi' ? 'Ổn định' : 'Stable', time: '1h ago', level: 'green' },
                  { name: 'Hoàng Văn E (9A)', status: language === 'vi' ? 'Cảnh báo Đỏ' : 'Red Alert', time: '2h ago', level: 'red' },
                ].map((notif, idx) => (
                    <div key={idx} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <img src={`https://picsum.photos/seed/user${idx}/40/40`} className="w-10 h-10 rounded-full" alt="" />
                      <div>
                        <div className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{notif.name}</div>
                        <div className={`text-xs font-medium px-2 py-0.5 rounded-md inline-block cursor-pointer hover:opacity-80 transition-opacity ${
                          notif.level === 'red' ? 'bg-red-100 text-red-600' : 
                          notif.level === 'orange' ? 'bg-orange-100 text-orange-600' :
                          notif.level === 'yellow' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
                        }`}
                        onClick={() => setSelectedAlert({ 
                          ...notif, 
                          issue: notif.status, 
                          class: notif.name.match(/\(([^)]+)\)/)?.[1] || '9A' 
                        })}
                        >
                          {notif.status}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-gray-400">{notif.time}</span>
                      <AlertTriangle 
                        className={`w-5 h-5 cursor-pointer hover:scale-110 transition-transform ${
                          notif.level === 'red' ? 'text-red-500' : 
                          notif.level === 'orange' ? 'text-orange-500' :
                          notif.level === 'yellow' ? 'text-yellow-500' : 'text-green-500'
                        }`} 
                        onClick={() => setSelectedAlert({ 
                          ...notif, 
                          issue: notif.status, 
                          class: notif.name.match(/\(([^)]+)\)/)?.[1] || '9A' 
                        })}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        ) : currentView === 'students' ? (
          <StudentListView isDarkMode={isDarkMode} language={language} setStudents={setStudents} students={students} />
        ) : currentView === 'alerts' ? (
          <AlertsView isDarkMode={isDarkMode} language={language} onSelectAlert={setSelectedAlert} students={students} />
        ) : currentView === 'reports' ? (
          <ReportsView isDarkMode={isDarkMode} language={language} students={students} />
        ) : currentView === 'resources' ? (
          <ResourcesView isDarkMode={isDarkMode} language={language} />
        ) : currentView === 'settings' ? (
          <SettingsView 
            onNavigate={setCurrentView} 
            isDarkMode={isDarkMode} 
            setIsDarkMode={setIsDarkMode} 
            language={language}
            setLanguage={setLanguage}
            students={students}
          />
        ) : currentView === 'camera' ? (
          <CameraMonitoringView onBack={() => setCurrentView('settings')} isDarkMode={isDarkMode} language={language} />
        ) : null}
      </main>

      {/* Alert Detail Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div 
            className={`w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 transform scale-100 ${isDarkMode ? 'bg-[#1a1a1a] border border-white/10' : 'bg-white'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`p-6 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
              <h3 className={`text-lg font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{t.alertDetail}</h3>
              <button 
                onClick={() => { setSelectedAlert(null); setSelectedAction(null); }}
                className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-white/5 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8 space-y-8">
              <div className="flex items-center gap-6">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-inner ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                  <User className={`w-10 h-10 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                </div>
                <div>
                  <div className={`text-2xl font-black mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{selectedAlert.name}</div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
                      {t.classes}: {selectedAlert.class || '9A'}
                    </span>
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
                      selectedAlert.level === 'red' || selectedAlert.status?.includes('Đỏ') ? 'bg-red-100 text-red-600' : 
                      selectedAlert.level === 'orange' || selectedAlert.status?.includes('Cam') ? 'bg-orange-100 text-orange-600' :
                      selectedAlert.level === 'yellow' || selectedAlert.status?.includes('Vàng') ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
                    }`}>
                      {selectedAlert.status || selectedAlert.issue}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className={`text-xs font-black uppercase tracking-[0.2em] ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{t.interventionProposal}</h4>
                <div className="space-y-3">
                  {(function() {
                    const level = selectedAlert.level || (selectedAlert.status?.includes('Đỏ') || selectedAlert.status?.includes('Red') ? 'red' : (selectedAlert.status?.includes('Vàng') || selectedAlert.status?.includes('Yellow')) ? 'yellow' : (selectedAlert.status?.includes('Cam') || selectedAlert.status?.includes('Orange')) ? 'orange' : 'green');
                    const actionsMapping = {
                      green: [
                        { 
                          icon: <Activity className="w-4 h-4" />, 
                          text: t.actionGreenText,
                          pros: t.actionGreenPros,
                          cons: t.actionGreenCons
                        }
                      ],
                      yellow: [
                        { 
                          icon: <MessageSquare className="w-4 h-4" />, 
                          text: t.actionYellowText,
                          pros: t.actionYellowPros,
                          cons: t.actionYellowCons
                        }
                      ],
                      orange: [
                        { 
                          icon: <Users className="w-4 h-4" />, 
                          text: t.actionOrangeText,
                          pros: t.actionOrangePros,
                          cons: t.actionOrangeCons
                        }
                      ],
                      red: [
                        { 
                          icon: <AlertTriangle className="w-4 h-4" />, 
                          text: t.actionRedText,
                          pros: t.actionRedPros,
                          cons: t.actionRedCons
                        }
                      ]
                    };
                    const actions = actionsMapping[level as keyof typeof actionsMapping] || [];

                    return actions.map((action, i) => (
                      <div key={i} className="space-y-2">
                        <div 
                          onClick={() => setSelectedAction(selectedAction === i ? null : i)}
                          className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all hover:scale-[1.01] ${
                            selectedAction === i 
                              ? (isDarkMode ? 'bg-[#d4af37]/10 border-[#d4af37]' : 'bg-[#d4af37]/5 border-[#d4af37]')
                              : (isDarkMode ? 'bg-white/5 border-white/5 hover:border-white/20' : 'bg-gray-50 border-gray-100 hover:border-gray-200')
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${selectedAction === i ? 'bg-[#d4af37] text-[#0a192f]' : 'bg-[#d4af37]/10 text-[#d4af37]'}`}>
                            {action.icon}
                          </div>
                          <div className="flex-1">
                            <p className={`text-sm font-bold leading-relaxed ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{action.text}</p>
                            {selectedAction === i && (
                              <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                <div className="flex gap-2">
                                  <div className="w-1 h-auto bg-green-500 rounded-full shrink-0"></div>
                                  <div>
                                    <span className="text-[10px] font-black uppercase text-green-500 tracking-wider">{t.pros}</span>
                                    <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{action.pros}</p>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <div className="w-1 h-auto bg-red-500 rounded-full shrink-0"></div>
                                  <div>
                                    <span className="text-[10px] font-black uppercase text-red-500 tracking-wider">{t.cons}</span>
                                    <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{action.cons}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          <ChevronRight className={`w-4 h-4 mt-1.5 transition-transform duration-300 ${selectedAction === i ? 'rotate-90 text-[#d4af37]' : 'text-gray-400'}`} />
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </div>

            <div className={`p-6 border-t flex gap-3 ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
              <button 
                onClick={() => { setSelectedAlert(null); setSelectedAction(null); }}
                className={`flex-1 py-4 rounded-2xl font-bold transition-all ${isDarkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              >
                {t.close}
              </button>
              <button 
                className="flex-1 py-4 bg-gradient-to-r from-[#d4af37] to-[#f9d423] text-[#0a192f] font-black rounded-2xl shadow-lg shadow-[#d4af37]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                {t.startIntervention}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
