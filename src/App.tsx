import React, { useState } from 'react';
import { utils, writeFile } from 'xlsx';
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
  Trash2
} from 'lucide-react';
const markedStudents = [
  { id: 1, name: 'Nguyễn Văn An (9A)', wellbeing: 80, status: 'Theo dõi thêm', color: 'bg-green-500' },
  { id: 2, name: 'Trần Thị Bình (9B)', wellbeing: 45, status: 'Sắp xếp gặp mặt', color: 'bg-yellow-500' },
  { id: 3, name: 'Lê Hoàng Cường (9A)', wellbeing: 25, status: 'Cần can thiệp', color: 'bg-red-500' },
  { id: 4, name: 'Phạm Thị Dung (9B)', wellbeing: 60, status: 'Sắp xếp gặp mặt', color: 'bg-yellow-500' },
  { id: 5, name: 'Hoàng Văn Em (9A)', wellbeing: 90, status: 'Theo dõi thêm', color: 'bg-green-500' },
  { id: 6, name: 'Đặng Thị Phương (9B)', wellbeing: 35, status: 'Cần can thiệp', color: 'bg-red-500' },
  { id: 7, name: 'Vũ Trọng Giáp (9A)', wellbeing: 75, status: 'Theo dõi thêm', color: 'bg-green-500' },
  { id: 8, name: 'Bùi Thị Hạnh (9B)', wellbeing: 50, status: 'Sắp xếp gặp mặt', color: 'bg-yellow-500' },
  { id: 9, name: 'Đỗ Văn Inh (9A)', wellbeing: 85, status: 'Theo dõi thêm', color: 'bg-green-500' },
  { id: 10, name: 'Ngô Thị Kim (9B)', wellbeing: 30, status: 'Cần can thiệp', color: 'bg-red-500' },
  { id: 11, name: 'Lý Minh Linh (9A)', wellbeing: 65, status: 'Sắp xếp gặp mặt', color: 'bg-yellow-500' },
  { id: 12, name: 'Phan Ngọc Mạnh (9B)', wellbeing: 95, status: 'Theo dõi thêm', color: 'bg-green-500' },
  { id: 13, name: 'Vương Hữu Nga (9A)', wellbeing: 40, status: 'Sắp xếp gặp mặt', color: 'bg-yellow-500' },
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

function StudentListView({ isDarkMode }: { isDarkMode: boolean }) {
  const [isUploaded, setIsUploaded] = useState(false);

  if (isUploaded) {
    return (
      <div className="flex-1 overflow-auto p-8">
        <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Danh sách Học sinh</h2>
        <div className={`rounded-2xl p-6 shadow-sm transition-colors ${isDarkMode ? 'bg-[#121212] border border-white/10' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Tất cả học sinh</h3>
            <label className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isDarkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-[#dceaea] text-gray-800 hover:bg-[#cce6e6]'}`}>
              Tải lên file khác
              <input 
                type="file" 
                accept=".xlsx, .xls" 
                className="hidden" 
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setIsUploaded(true);
                  }
                }}
              />
            </label>
          </div>
          <div className={`text-center py-12 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            <Users className={`w-12 h-12 mx-auto mb-3 ${isDarkMode ? 'text-gray-700' : 'text-gray-300'}`} />
            <p className={isDarkMode ? 'text-gray-400' : ''}>Danh sách học sinh đã được tải lên thành công.</p>
            <p className="text-sm mt-1">Hệ thống đang xử lý dữ liệu...</p>
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
        <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Nhập danh sách học sinh</h2>
        <p className={`mb-8 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Tải lên file .xlsx chứa danh sách học sinh của trường để bắt đầu theo dõi.</p>
        
        <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#3b82f6] text-white rounded-xl font-medium hover:bg-blue-600 transition-colors">
          <UploadCloud className="w-5 h-5" />
          <span>Chọn file .xlsx</span>
          <input 
            type="file" 
            accept=".xlsx, .xls" 
            className="hidden" 
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setIsUploaded(true);
              }
            }}
          />
        </label>
      </div>
    </div>
  );
}

function AlertsView({ isDarkMode }: { isDarkMode: boolean }) {
  const alertStudents = markedStudents.filter(s => s.color === 'bg-yellow-500' || s.color === 'bg-red-500');

  return (
    <div className="flex-1 overflow-auto p-8">
      <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Cảnh báo Học sinh</h2>
      <div className={`rounded-2xl p-6 shadow-sm transition-colors ${isDarkMode ? 'bg-[#121212] border border-white/10' : 'bg-white'}`}>
        <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Danh sách cần chú ý (Vàng & Đỏ)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className={`${isDarkMode ? 'text-gray-500 border-b border-white/5' : 'text-gray-500 border-b border-gray-100'}`}>
              <tr>
                <th className="pb-3 font-medium">Học sinh</th>
                <th className="pb-3 font-medium text-center">Mức độ cảnh báo</th>
                <th className="pb-3 font-medium text-center">Trạng thái</th>
                <th className="pb-3 font-medium text-right">Hành động</th>
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
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${student.color === 'bg-red-500' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {student.color === 'bg-red-500' ? 'Cảnh báo Đỏ' : 'Cảnh báo Vàng'}
                    </span>
                  </td>
                  <td className={`py-4 text-center font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                    {student.status}
                  </td>
                  <td className="py-4 text-right">
                    <button className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${isDarkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-[#dceaea] text-gray-800 hover:bg-[#cce6e6]'}`}>
                      Xem chi tiết
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

function ReportsView({ isDarkMode }: { isDarkMode: boolean }) {
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
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Tạo biên bản mới</h2>
        </div>

        <div className={`rounded-2xl p-8 shadow-sm max-w-3xl transition-colors ${isDarkMode ? 'bg-[#121212] border border-white/10' : 'bg-white'}`}>
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Học sinh</label>
                <select className={`w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200'}`}>
                  <option value="">Chọn học sinh...</option>
                  {markedStudents.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Ngày gặp</label>
                <input 
                  type="date" 
                  className={`w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200'}`}
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Lý do gặp gỡ / Vấn đề chính</label>
              <input 
                type="text" 
                placeholder="Ví dụ: Áp lực học tập, mâu thuẫn bạn bè..."
                className={`w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200'}`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Nội dung trao đổi chi tiết</label>
              <textarea 
                rows={5}
                placeholder="Ghi chú lại những điểm chính đã trao đổi với học sinh..."
                className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200'}`}
              ></textarea>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Đề xuất / Hướng giải quyết</label>
              <textarea 
                rows={3}
                placeholder="Các bước tiếp theo, lời khuyên hoặc hành động cần thực hiện..."
                className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200'}`}
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Trạng thái</label>
                <select className={`w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200'}`}>
                  <option value="Đang theo dõi">Đang theo dõi</option>
                  <option value="Đã hoàn thành">Đã hoàn thành</option>
                  <option value="Cần can thiệp khẩn cấp">Cần can thiệp khẩn cấp</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phụ trách</label>
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
                Hủy bỏ
              </button>
              <button 
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-6 py-2.5 bg-[#3b82f6] text-white rounded-xl font-medium hover:bg-blue-600 transition-colors shadow-sm"
              >
                Lưu biên bản
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto p-8">
      <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Báo cáo & Biên bản</h2>
      <div className={`rounded-2xl p-6 shadow-sm transition-colors ${isDarkMode ? 'bg-[#121212] border border-white/10' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Biên bản gặp gỡ học sinh gần đây</h3>
          <button 
            onClick={() => setIsCreating(true)}
            className="px-4 py-2 bg-[#3b82f6] text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            + Tạo biên bản mới
          </button>
        </div>
        
        <div className="grid gap-4">
          {meetingReports.map((report) => (
            <div key={report.id} className={`rounded-xl p-5 hover:shadow-sm transition-all border ${isDarkMode ? 'bg-white/5 border-white/5 hover:border-white/10' : 'bg-gray-50/50 border-gray-100 hover:border-blue-100'}`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{report.studentName} <span className={`text-sm font-normal ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>({report.class})</span></h4>
                  <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Ngày gặp: {report.date} • Phụ trách: {report.counselor}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${report.status === 'Đã hoàn thành' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                  {report.status}
                </span>
              </div>
              <div className={`p-4 rounded-lg border mt-3 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100'}`}>
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Nội dung tóm tắt:</span> {report.summary}
                </p>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${isDarkMode ? 'text-gray-400 hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'}`}>
                  Chỉnh sửa
                </button>
                <button className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${isDarkMode ? 'bg-[#dceaea] text-gray-800 hover:bg-[#cce6e6]' : 'bg-[#dceaea] text-gray-800 hover:bg-[#cce6e6]'}`}>
                  Xem chi tiết
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

function ResourcesView({ isDarkMode }: { isDarkMode: boolean }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [localResources, setLocalResources] = useState(resources);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newResource = {
        id: localResources.length + 1,
        title: file.name,
        category: activeCategory || 'Tài liệu chuyên môn',
        type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        url: '#'
      };
      setLocalResources([newResource, ...localResources]);
      alert(`Đã tải lên thành công: ${file.name}`);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tài liệu này?')) {
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
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Nguồn tài nguyên</h2>
        <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-[#3b82f6] text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors shadow-sm">
          <Upload className="w-4 h-4" />
          Tải tài liệu lên
          <input type="file" className="hidden" onChange={handleFileUpload} />
        </label>
      </div>
      
      <div className="grid grid-cols-3 gap-6 mb-8">
        <button 
          onClick={() => setActiveCategory(activeCategory === 'Tài liệu chuyên môn' ? null : 'Tài liệu chuyên môn')}
          className={`text-left rounded-2xl p-6 border transition-all ${activeCategory === 'Tài liệu chuyên môn' ? (isDarkMode ? 'bg-blue-900/30 border-blue-500 shadow-lg' : 'bg-blue-100 border-blue-300 shadow-md') : (isDarkMode ? 'bg-[#1a1a1a] border-white/5 hover:bg-white/5' : 'bg-blue-50 border-blue-100 hover:bg-blue-100/50')}`}
        >
          <BookOpen className={`w-8 h-8 mb-3 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />
          <h3 className={`font-bold text-lg mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Tài liệu chuyên môn</h3>
          <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Các nghiên cứu, cẩm nang và hướng dẫn chẩn đoán.</p>
        </button>
        <button 
          onClick={() => setActiveCategory(activeCategory === 'Kỹ năng tham vấn' ? null : 'Kỹ năng tham vấn')}
          className={`text-left rounded-2xl p-6 border transition-all ${activeCategory === 'Kỹ năng tham vấn' ? (isDarkMode ? 'bg-green-900/30 border-green-500 shadow-lg' : 'bg-green-100 border-green-300 shadow-md') : (isDarkMode ? 'bg-[#1a1a1a] border-white/5 hover:bg-white/5' : 'bg-green-50 border-green-100 hover:bg-green-100/50')}`}
        >
          <Users className={`w-8 h-8 mb-3 ${isDarkMode ? 'text-green-400' : 'text-green-500'}`} />
          <h3 className={`font-bold text-lg mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Kỹ năng tham vấn</h3>
          <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Tài liệu đào tạo kỹ năng giao tiếp và thấu cảm.</p>
        </button>
        <button 
          onClick={() => setActiveCategory(activeCategory === 'Xử lý tình huống' ? null : 'Xử lý tình huống')}
          className={`text-left rounded-2xl p-6 border transition-all ${activeCategory === 'Xử lý tình huống' ? (isDarkMode ? 'bg-orange-900/30 border-orange-500 shadow-lg' : 'bg-orange-100 border-orange-300 shadow-md') : (isDarkMode ? 'bg-[#1a1a1a] border-white/5 hover:bg-white/5' : 'bg-orange-50 border-orange-100 hover:bg-orange-100/50')}`}
        >
          <AlertTriangle className={`w-8 h-8 mb-3 ${isDarkMode ? 'text-orange-400' : 'text-orange-500'}`} />
          <h3 className={`font-bold text-lg mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Xử lý tình huống</h3>
          <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Quy trình chuẩn để xử lý các ca khủng hoảng.</p>
        </button>
      </div>

      <div className={`rounded-2xl p-6 shadow-sm transition-colors ${isDarkMode ? 'bg-[#121212] border border-white/10' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{activeCategory ? `Tài liệu: ${activeCategory}` : 'Tài liệu nổi bật'}</h3>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm tài liệu..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-gray-200'}`}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className={`${isDarkMode ? 'text-gray-500 border-b border-white/5' : 'text-gray-500 border-b border-gray-100'}`}>
              <tr>
                <th className="pb-3 font-medium">Tên tài liệu</th>
                <th className="pb-3 font-medium">Danh mục</th>
                <th className="pb-3 font-medium">Định dạng</th>
                <th className="pb-3 font-medium text-right">Hành động</th>
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
                      {resource.category}
                    </span>
                  </td>
                  <td className={`py-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    {resource.type} • {resource.size}
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex justify-end gap-2">
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
                        className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'text-gray-400 hover:text-red-400 hover:bg-white/5' : 'text-gray-500 hover:text-red-600 hover:bg-red-50'}`}
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
              Không tìm thấy tài liệu nào phù hợp.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CameraMonitoringView({ onBack, isDarkMode }: { onBack: () => void, isDarkMode: boolean }) {
  const cameras = [
    { id: 1, name: 'Lớp 9A - Phòng 101', status: 'Live', emotion: 'Tập trung', count: 28, color: 'text-indigo-500', video: 'https://assets.mixkit.co/videos/preview/mixkit-students-in-a-classroom-1536-large.mp4' },
    { id: 2, name: 'Lớp 9B - Phòng 102', status: 'Live', emotion: 'Vui vẻ', count: 30, color: 'text-green-500', video: 'https://assets.mixkit.co/videos/preview/mixkit-teacher-explaining-a-topic-to-her-students-41551-large.mp4' },
    { id: 3, name: 'Thư viện Trung tâm', status: 'Live', emotion: 'Yên tĩnh', count: 15, color: 'text-blue-500', video: 'https://assets.mixkit.co/videos/preview/mixkit-group-of-students-working-in-a-library-41550-large.mp4' },
    { id: 4, name: 'Hành lang Chính', status: 'Live', emotion: 'Bình thường', count: 12, color: 'text-orange-500', video: 'https://assets.mixkit.co/videos/preview/mixkit-students-walking-in-a-university-hallway-41549-large.mp4' },
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
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Hệ thống Giám sát Camera AI</h2>
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
                    <p className="text-white text-[10px] uppercase tracking-wider opacity-70">Phân tích cảm xúc</p>
                    <p className={`text-sm font-bold ${cam.color}`}>{cam.emotion}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-2 rounded-lg border border-white/10">
                    <p className="text-white text-[10px] uppercase tracking-wider opacity-70">Số người</p>
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

function SettingsView({ onNavigate, isDarkMode, setIsDarkMode }: { onNavigate: (view: string) => void, isDarkMode: boolean, setIsDarkMode: (val: boolean) => void }) {
  const handleExportExcel = () => {
    // Prepare Student Data
    const studentData = markedStudents.map(s => ({
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
      <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Cài đặt</h2>
      
      <div className={`rounded-2xl p-6 shadow-sm max-w-3xl transition-colors duration-300 ${isDarkMode ? 'bg-[#121212] border border-white/10' : 'bg-white'}`}>
        <div className="space-y-6">
          
          {/* Export Data */}
          <div className={`flex items-center justify-between p-4 border rounded-xl transition-colors ${isDarkMode ? 'border-white/10 hover:bg-white/5' : 'border-gray-100 hover:bg-gray-50'}`}>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Xuất dữ liệu học sinh</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Tải xuống toàn bộ dữ liệu đánh giá và biên bản dưới dạng Excel.</p>
              </div>
            </div>
            <button 
              onClick={handleExportExcel}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isDarkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-[#dceaea] text-gray-800 hover:bg-[#cce6e6]'}`}
            >
              Xuất file
            </button>
          </div>

          {/* Camera Monitoring */}
          <div className={`flex items-center justify-between p-4 border rounded-xl transition-colors ${isDarkMode ? 'border-white/10 hover:bg-white/5' : 'border-gray-100 hover:bg-gray-50'}`}>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-50 text-purple-600'}`}>
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Khung camera giám sát trực tiếp</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Kết nối với hệ thống camera AI để phân tích cảm xúc thời gian thực.</p>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('camera')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isDarkMode ? 'bg-purple-900/50 text-purple-200 hover:bg-purple-900/70' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'}`}
            >
              Mở camera
            </button>
          </div>

          {/* Theme Toggle */}
          <div className={`flex items-center justify-between p-4 border rounded-xl transition-colors ${isDarkMode ? 'border-white/10 hover:bg-white/5' : 'border-gray-100 hover:bg-gray-50'}`}>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-orange-900/30 text-orange-400' : 'bg-orange-50 text-orange-600'}`}>
                {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </div>
              <div>
                <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Chủ đề giao diện</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Chuyển đổi giữa chế độ Sáng và Tối.</p>
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

          {/* Logout */}
          <div className={`flex items-center justify-between p-4 border rounded-xl transition-colors mt-8 ${isDarkMode ? 'border-red-900/30 hover:bg-red-900/10' : 'border-red-100 hover:bg-red-50'}`}>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-600'}`}>
                <LogOut className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>Đăng xuất</h3>
                <p className={`text-sm ${isDarkMode ? 'text-red-900/50' : 'text-red-400'}`}>Đăng xuất khỏi tài khoản hiện tại.</p>
              </div>
            </div>
            <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isDarkMode ? 'bg-red-900/50 text-red-200 hover:bg-red-900/70' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}>
              Đăng xuất
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    { id: 1, type: 'appointment', title: 'Lịch hẹn: Trần Thị Bình (9B)', time: 'Hôm nay, 14:30', description: 'Tham vấn tâm lý định kỳ.', status: 'upcoming' },
    { id: 2, type: 'alert', title: 'Cảnh báo: Lê Văn Cường (9A)', time: '10 phút trước', description: 'Phát hiện biểu hiện lo âu cao qua Camera.', status: 'urgent' },
    { id: 3, type: 'appointment', title: 'Lịch hẹn: Nguyễn Văn An (9A)', time: 'Ngày mai, 09:00', description: 'Theo dõi sau can thiệp.', status: 'upcoming' },
    { id: 4, type: 'alert', title: 'Cảnh báo: Phạm Minh Tuấn (9B)', time: '2 giờ trước', description: 'Vắng mặt không lý do 2 buổi liên tiếp.', status: 'normal' },
  ];

  const tools = [
    { id: 'dashboard', name: 'Dashboard Tổng quan', icon: <Home className="w-4 h-4" />, description: 'Xem số liệu thống kê và tình trạng học sinh' },
    { id: 'students', name: 'Danh sách học sinh', icon: <Users className="w-4 h-4" />, description: 'Quản lý thông tin và đánh giá học sinh' },
    { id: 'alerts', name: 'Cảnh báo tâm lý', icon: <AlertTriangle className="w-4 h-4" />, description: 'Theo dõi các trường hợp cần can thiệp gấp' },
    { id: 'reports', name: 'Báo cáo & Biên bản', icon: <FileText className="w-4 h-4" />, description: 'Lưu trữ biên bản tham vấn và báo cáo định kỳ' },
    { id: 'resources', name: 'Nguồn tài nguyên', icon: <BookOpen className="w-4 h-4" />, description: 'Tài liệu chuyên môn và kỹ năng tham vấn' },
    { id: 'settings', name: 'Cài đặt hệ thống', icon: <Settings className="w-4 h-4" />, description: 'Cấu hình tài khoản, giao diện và xuất dữ liệu' },
    { id: 'camera', name: 'Camera giám sát AI', icon: <Video className="w-4 h-4" />, description: 'Theo dõi trực tiếp và phân tích cảm xúc học sinh' },
  ];

  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`flex h-screen font-sans overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-black text-white' : 'bg-[#eaf4f4] text-gray-800'}`}>
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
                placeholder="Tìm kiếm công cụ, tính năng..." 
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
                  Không tìm thấy công cụ nào phù hợp với "{searchQuery}"
                </div>
              )}
            </div>
            <div className={`px-6 py-3 border-t text-[10px] uppercase tracking-widest font-bold ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-500' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
              Nhấn vào công cụ để di chuyển nhanh
            </div>
          </div>
          <div className="fixed inset-0 -z-10" onClick={() => setIsSearchOpen(false)}></div>
        </div>
      )}

      {/* Sidebar */}
      <aside className={`w-64 flex flex-col shadow-sm z-10 transition-colors duration-300 ${isDarkMode ? 'bg-[#121212] border-r border-white/10' : 'bg-white'}`}>
        <div className="p-6">
          <h1 className="text-3xl font-bold text-[#3b82f6] tracking-tight">Koufuku</h1>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              currentView === 'dashboard' 
                ? (isDarkMode ? 'bg-white/10 text-white' : 'bg-[#dceaea] text-gray-800') 
                : (isDarkMode ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-gray-50')
            }`}
          >
            <Home className={`w-5 h-5 ${currentView === 'dashboard' ? (isDarkMode ? 'text-white' : 'text-gray-800') : (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`} />
            Dashboard
          </button>
          <button 
            onClick={() => setCurrentView('students')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              currentView === 'students' 
                ? (isDarkMode ? 'bg-white/10 text-white' : 'bg-[#dceaea] text-gray-800') 
                : (isDarkMode ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-gray-50')
            }`}
          >
            <Users className={`w-5 h-5 ${currentView === 'students' ? (isDarkMode ? 'text-white' : 'text-gray-800') : (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`} />
            Danh sách Học sinh
          </button>
          <button 
            onClick={() => setCurrentView('alerts')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              currentView === 'alerts' 
                ? (isDarkMode ? 'bg-white/10 text-white' : 'bg-[#dceaea] text-gray-800') 
                : (isDarkMode ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-gray-50')
            }`}
          >
            <AlertTriangle className={`w-5 h-5 ${currentView === 'alerts' ? (isDarkMode ? 'text-white' : 'text-gray-800') : (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`} />
            Cảnh báo
          </button>
          <button 
            onClick={() => setCurrentView('reports')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              currentView === 'reports' 
                ? (isDarkMode ? 'bg-white/10 text-white' : 'bg-[#dceaea] text-gray-800') 
                : (isDarkMode ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-gray-50')
            }`}
          >
            <FileText className={`w-5 h-5 ${currentView === 'reports' ? (isDarkMode ? 'text-white' : 'text-gray-800') : (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`} />
            Báo cáo
          </button>
          <button 
            onClick={() => setCurrentView('resources')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              currentView === 'resources' 
                ? (isDarkMode ? 'bg-white/10 text-white' : 'bg-[#dceaea] text-gray-800') 
                : (isDarkMode ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-gray-50')
            }`}
          >
            <BookOpen className={`w-5 h-5 ${currentView === 'resources' ? (isDarkMode ? 'text-white' : 'text-gray-800') : (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`} />
            Nguồn tài nguyên
          </button>
          <button 
            onClick={() => setCurrentView('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              currentView === 'settings' 
                ? (isDarkMode ? 'bg-white/10 text-white' : 'bg-[#dceaea] text-gray-800') 
                : (isDarkMode ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-gray-50')
            }`}
          >
            <Settings className={`w-5 h-5 ${currentView === 'settings' ? (isDarkMode ? 'text-white' : 'text-gray-800') : (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`} />
            Cài đặt
          </button>
        </nav>

        <div className={`p-4 border-t transition-colors duration-300 ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
          <div className="flex items-center gap-3 px-2">
            <img 
              src="https://picsum.photos/seed/baominh/40/40" 
              alt="Bảo Minh" 
              className="w-10 h-10 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
            <span className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Bảo Minh</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Bar */}
        <header className={`h-16 flex items-center justify-end px-8 gap-6 backdrop-blur-sm sticky top-0 z-20 transition-colors duration-300 ${isDarkMode ? 'bg-black/50' : 'bg-white/50'}`}>
          <button 
            onClick={() => setIsSearchOpen(true)}
            className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Search className="w-5 h-5" />
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className={`relative p-2 rounded-full transition-colors ${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {isNotificationsOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)}></div>
                <div className={`absolute right-0 mt-2 w-80 rounded-2xl shadow-xl z-50 overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-[#1a1a1a] border border-white/10' : 'bg-white border border-gray-100'}`}>
                  <div className={`px-4 py-3 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                    <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Thông báo quan trọng</h3>
                    <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold">4 MỚI</span>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {notifications.map(notif => (
                      <button 
                        key={notif.id}
                        className={`w-full text-left p-4 border-b last:border-0 transition-colors ${isDarkMode ? 'border-white/5 hover:bg-white/5' : 'border-gray-50 hover:bg-gray-50'}`}
                        onClick={() => {
                          if (notif.type === 'alert') setCurrentView('alerts');
                          if (notif.type === 'appointment') setCurrentView('reports');
                          setIsNotificationsOpen(false);
                        }}
                      >
                        <div className="flex gap-3">
                          <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${notif.status === 'urgent' ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`}></div>
                          <div className="flex-1">
                            <div className={`text-sm font-bold mb-0.5 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{notif.title}</div>
                            <div className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{notif.description}</div>
                            <div className={`text-[10px] font-medium ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{notif.time}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => {
                      setCurrentView('alerts');
                      setIsNotificationsOpen(false);
                    }}
                    className={`w-full py-3 text-center text-xs font-bold uppercase tracking-wider transition-colors ${isDarkMode ? 'bg-white/5 text-blue-400 hover:text-blue-300' : 'bg-gray-50 text-blue-600 hover:text-blue-700'}`}
                  >
                    Xem tất cả thông báo
                  </button>
                </div>
              </>
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
        </header>

        {/* Dashboard Content */}
        {currentView === 'dashboard' ? (
        <div className="flex-1 overflow-auto p-8">
          <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Dashboard Tổng quan</h2>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className={`rounded-2xl p-4 shadow-sm flex flex-col justify-between transition-colors ${isDarkMode ? 'bg-[#1a1a1a] border border-white/10' : 'bg-[#dcfce7]'}`}>
              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tổng số học sinh:</span>
              <span className="text-3xl font-bold mt-2">120</span>
            </div>
            <div className={`rounded-2xl p-4 shadow-sm flex flex-col justify-between transition-colors ${isDarkMode ? 'bg-[#1a1a1a] border border-white/10' : 'bg-white'}`}>
              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Lớp</span>
              <span className="text-xl font-bold mt-2">Lớp 9A, 9B</span>
            </div>
            <div className={`rounded-2xl p-4 shadow-sm flex flex-col justify-between transition-colors ${isDarkMode ? 'bg-[#1a1a1a] border border-white/10' : 'bg-[#fef3c7]'}`}>
              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Học sinh cần theo dõi:</span>
              <span className="text-3xl font-bold mt-2">8</span>
            </div>
            <div className={`rounded-2xl p-4 shadow-sm flex flex-col justify-between relative transition-colors ${isDarkMode ? 'bg-[#1a1a1a] border border-white/10' : 'bg-[#fce8e6]'}`}>
              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Cảnh báo cao (Đỏ):</span>
              <div className="flex items-end justify-between mt-2">
                <span className="text-3xl font-bold">3</span>
                <AlertTriangle className="w-6 h-6 text-red-500 mb-1" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Left Column (Table) */}
            <div className="col-span-2 flex flex-col gap-6">
              
              {/* Marked Students Table */}
              <div className={`rounded-2xl p-6 shadow-sm transition-colors ${isDarkMode ? 'bg-[#121212] border border-white/10' : 'bg-white'}`}>
                <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Học sinh được Đánh dấu</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className={`${isDarkMode ? 'text-gray-500 border-b border-white/5' : 'text-gray-500 border-b border-gray-100'}`}>
                      <tr>
                        <th className="pb-3 font-medium">Học sinh</th>
                        <th className="pb-3 font-medium text-center">Wellbeing</th>
                        <th className="pb-3 font-medium text-center">Đánh dấu</th>
                        <th className="pb-3 font-medium text-right">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {markedStudents.map((student) => (
                        <tr key={student.id} className={`border-b last:border-0 ${isDarkMode ? 'border-white/5' : 'border-gray-50'}`}>
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-gray-500 ${isDarkMode ? 'bg-white/5' : 'bg-gray-200'}`}>
                                <User className="w-4 h-4" />
                              </div>
                              <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{student.name}</span>
                            </div>
                          </td>
                          <td className="py-4 align-middle">
                            <div className={`w-24 h-2 rounded-full mx-auto overflow-hidden ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                              <div 
                                className={`h-full rounded-full ${student.color}`} 
                                style={{ width: `${student.wellbeing}%` }}
                              ></div>
                            </div>
                          </td>
                          <td className={`py-4 text-center font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                            {student.status}
                          </td>
                          <td className="py-4 text-right">
                            <button className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${isDarkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-[#dceaea] text-gray-800 hover:bg-[#cce6e6]'}`}>
                              Hành động
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* Right Column (Alerts) */}
            <div className="col-span-1">
              <div className="bg-transparent h-full flex flex-col">
                <div className="flex justify-between items-center mb-4 px-2">
                  <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Cảnh báo Tâm lý Gần đây</h3>
                  <a href="#" className={`text-xs flex items-center ${isDarkMode ? 'text-gray-500 hover:text-white' : 'text-gray-500 hover:text-gray-800'}`}>
                    Xem tất cả <ChevronRight className="w-3 h-3 ml-1" />
                  </a>
                </div>
                
                <div className="flex flex-col gap-3">
                  {recentAlerts.map((alert) => (
                    <div key={alert.id} className={`${isDarkMode ? 'bg-[#1a1a1a] border border-white/10' : alert.color} rounded-2xl p-4 shadow-sm flex items-start gap-3 transition-colors`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-1 ${isDarkMode ? 'bg-white/5 text-gray-400' : 'bg-gray-200/50 text-gray-600'}`}>
                        <User className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium text-sm leading-snug mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                          {alert.name} - {alert.issue}
                        </p>
                        <button className={`px-3 py-1 rounded-md text-xs font-medium transition-colors border ${isDarkMode ? 'bg-white/10 text-white border-white/10 hover:bg-white/20' : 'bg-white/60 text-gray-800 border-black/5 hover:bg-white/80'}`}>
                          Xem chi tiết
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
        ) : currentView === 'students' ? (
          <StudentListView isDarkMode={isDarkMode} />
        ) : currentView === 'alerts' ? (
          <AlertsView isDarkMode={isDarkMode} />
        ) : currentView === 'reports' ? (
          <ReportsView isDarkMode={isDarkMode} />
        ) : currentView === 'resources' ? (
          <ResourcesView isDarkMode={isDarkMode} />
        ) : currentView === 'settings' ? (
          <SettingsView onNavigate={setCurrentView} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        ) : currentView === 'camera' ? (
          <CameraMonitoringView onBack={() => setCurrentView('settings')} isDarkMode={isDarkMode} />
        ) : null}
      </main>
    </div>
  );
}
