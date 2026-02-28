import React, { useState } from 'react';
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
  Video
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

function StudentListView() {
  const [isUploaded, setIsUploaded] = useState(false);

  if (isUploaded) {
    return (
      <div className="flex-1 overflow-auto p-8">
        <h2 className="text-2xl font-bold mb-6">Danh sách Học sinh</h2>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Tất cả học sinh</h3>
            <label className="cursor-pointer px-4 py-2 bg-[#dceaea] text-gray-800 rounded-lg text-sm font-medium hover:bg-[#cce6e6] transition-colors">
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
          <div className="text-center py-12 text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Danh sách học sinh đã được tải lên thành công.</p>
            <p className="text-sm mt-1">Hệ thống đang xử lý dữ liệu...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto p-8 flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl p-10 shadow-sm max-w-lg w-full text-center border-2 border-dashed border-gray-200">
        <div className="w-16 h-16 bg-[#eaf4f4] rounded-full flex items-center justify-center mx-auto mb-4 text-[#3b82f6]">
          <FileSpreadsheet className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Nhập danh sách học sinh</h2>
        <p className="text-gray-500 mb-8">Tải lên file .xlsx chứa danh sách học sinh của trường để bắt đầu theo dõi.</p>
        
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

function AlertsView() {
  const alertStudents = markedStudents.filter(s => s.color === 'bg-yellow-500' || s.color === 'bg-red-500');

  return (
    <div className="flex-1 overflow-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Cảnh báo Học sinh</h2>
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold mb-4">Danh sách cần chú ý (Vàng & Đỏ)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-500 border-b border-gray-100">
              <tr>
                <th className="pb-3 font-medium">Học sinh</th>
                <th className="pb-3 font-medium text-center">Mức độ cảnh báo</th>
                <th className="pb-3 font-medium text-center">Trạng thái</th>
                <th className="pb-3 font-medium text-right">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {alertStudents.map((student) => (
                <tr key={student.id} className="border-b border-gray-50 last:border-0">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                        <User className="w-4 h-4" />
                      </div>
                      <span className="font-medium">{student.name}</span>
                    </div>
                  </td>
                  <td className="py-4 align-middle text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${student.color === 'bg-red-500' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {student.color === 'bg-red-500' ? 'Cảnh báo Đỏ' : 'Cảnh báo Vàng'}
                    </span>
                  </td>
                  <td className="py-4 text-center font-medium">
                    {student.status}
                  </td>
                  <td className="py-4 text-right">
                    <button className="px-4 py-1.5 bg-[#dceaea] text-gray-800 rounded-lg text-sm font-medium hover:bg-[#cce6e6] transition-colors">
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

function ReportsView() {
  const [isCreating, setIsCreating] = useState(false);

  if (isCreating) {
    return (
      <div className="flex-1 overflow-auto p-8">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => setIsCreating(false)}
            className="p-2 hover:bg-white rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <h2 className="text-2xl font-bold">Tạo biên bản mới</h2>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm max-w-3xl">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Học sinh</label>
                <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all">
                  <option value="">Chọn học sinh...</option>
                  {markedStudents.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ngày gặp</label>
                <input 
                  type="date" 
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lý do gặp gỡ / Vấn đề chính</label>
              <input 
                type="text" 
                placeholder="Ví dụ: Áp lực học tập, mâu thuẫn bạn bè..."
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung trao đổi chi tiết</label>
              <textarea 
                rows={5}
                placeholder="Ghi chú lại những điểm chính đã trao đổi với học sinh..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Đề xuất / Hướng giải quyết</label>
              <textarea 
                rows={3}
                placeholder="Các bước tiếp theo, lời khuyên hoặc hành động cần thực hiện..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
                <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all">
                  <option value="Đang theo dõi">Đang theo dõi</option>
                  <option value="Đã hoàn thành">Đã hoàn thành</option>
                  <option value="Cần can thiệp khẩn cấp">Cần can thiệp khẩn cấp</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phụ trách</label>
                <input 
                  type="text" 
                  defaultValue="Bảo Minh"
                  disabled
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-100 text-gray-500 outline-none cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button 
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl font-medium transition-colors"
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
      <h2 className="text-2xl font-bold mb-6">Báo cáo & Biên bản</h2>
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">Biên bản gặp gỡ học sinh gần đây</h3>
          <button 
            onClick={() => setIsCreating(true)}
            className="px-4 py-2 bg-[#3b82f6] text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            + Tạo biên bản mới
          </button>
        </div>
        
        <div className="grid gap-4">
          {meetingReports.map((report) => (
            <div key={report.id} className="border border-gray-100 rounded-xl p-5 hover:border-blue-100 hover:shadow-sm transition-all bg-gray-50/50">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-lg text-gray-800">{report.studentName} <span className="text-sm font-normal text-gray-500">({report.class})</span></h4>
                  <p className="text-sm text-gray-500 mt-1">Ngày gặp: {report.date} • Phụ trách: {report.counselor}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${report.status === 'Đã hoàn thành' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                  {report.status}
                </span>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-100 mt-3">
                <p className="text-sm text-gray-700 leading-relaxed">
                  <span className="font-medium text-gray-900">Nội dung tóm tắt:</span> {report.summary}
                </p>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-md text-sm font-medium transition-colors">
                  Chỉnh sửa
                </button>
                <button className="px-3 py-1.5 bg-[#dceaea] text-gray-800 rounded-md text-sm font-medium hover:bg-[#cce6e6] transition-colors">
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
];

function ResourcesView() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredResources = activeCategory 
    ? resources.filter(r => r.category === activeCategory)
    : resources;

  return (
    <div className="flex-1 overflow-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Nguồn tài nguyên</h2>
      
      <div className="grid grid-cols-3 gap-6 mb-8">
        <button 
          onClick={() => setActiveCategory(activeCategory === 'Tài liệu chuyên môn' ? null : 'Tài liệu chuyên môn')}
          className={`text-left rounded-2xl p-6 border transition-all ${activeCategory === 'Tài liệu chuyên môn' ? 'bg-blue-100 border-blue-300 shadow-md' : 'bg-blue-50 border-blue-100 hover:bg-blue-100/50'}`}
        >
          <BookOpen className="w-8 h-8 text-blue-500 mb-3" />
          <h3 className="font-bold text-lg mb-1">Tài liệu chuyên môn</h3>
          <p className="text-sm text-gray-600">Các nghiên cứu, cẩm nang và hướng dẫn chẩn đoán.</p>
        </button>
        <button 
          onClick={() => setActiveCategory(activeCategory === 'Kỹ năng tham vấn' ? null : 'Kỹ năng tham vấn')}
          className={`text-left rounded-2xl p-6 border transition-all ${activeCategory === 'Kỹ năng tham vấn' ? 'bg-green-100 border-green-300 shadow-md' : 'bg-green-50 border-green-100 hover:bg-green-100/50'}`}
        >
          <Users className="w-8 h-8 text-green-500 mb-3" />
          <h3 className="font-bold text-lg mb-1">Kỹ năng tham vấn</h3>
          <p className="text-sm text-gray-600">Tài liệu đào tạo kỹ năng giao tiếp và thấu cảm.</p>
        </button>
        <button 
          onClick={() => setActiveCategory(activeCategory === 'Xử lý tình huống' ? null : 'Xử lý tình huống')}
          className={`text-left rounded-2xl p-6 border transition-all ${activeCategory === 'Xử lý tình huống' ? 'bg-orange-100 border-orange-300 shadow-md' : 'bg-orange-50 border-orange-100 hover:bg-orange-100/50'}`}
        >
          <AlertTriangle className="w-8 h-8 text-orange-500 mb-3" />
          <h3 className="font-bold text-lg mb-1">Xử lý tình huống</h3>
          <p className="text-sm text-gray-600">Quy trình chuẩn để xử lý các ca khủng hoảng.</p>
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">{activeCategory ? `Tài liệu: ${activeCategory}` : 'Tài liệu nổi bật'}</h3>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm tài liệu..." 
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-500 border-b border-gray-100">
              <tr>
                <th className="pb-3 font-medium">Tên tài liệu</th>
                <th className="pb-3 font-medium">Danh mục</th>
                <th className="pb-3 font-medium">Định dạng</th>
                <th className="pb-3 font-medium text-right">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredResources.map((resource) => (
                <tr key={resource.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 font-medium text-gray-800">
                    {resource.title}
                  </td>
                  <td className="py-4 text-gray-600">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {resource.category}
                    </span>
                  </td>
                  <td className="py-4 text-gray-500">
                    {resource.type} • {resource.size}
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <a href={resource.url} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Truy cập / Xem">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      {resource.type === 'PDF' && (
                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Tải xuống">
                          <Download className="w-4 h-4" />
                        </a>
                      )}
                    </div>
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

function SettingsView() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className="flex-1 overflow-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Cài đặt</h2>
      
      <div className="bg-white rounded-2xl p-6 shadow-sm max-w-3xl">
        <div className="space-y-6">
          
          {/* Export Data */}
          <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Xuất dữ liệu học sinh</h3>
                <p className="text-sm text-gray-500">Tải xuống toàn bộ dữ liệu đánh giá và biên bản dưới dạng Excel.</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-[#dceaea] text-gray-800 rounded-lg text-sm font-medium hover:bg-[#cce6e6] transition-colors">
              Xuất file
            </button>
          </div>

          {/* Camera Monitoring */}
          <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Khung camera giám sát trực tiếp</h3>
                <p className="text-sm text-gray-500">Kết nối với hệ thống camera AI để phân tích cảm xúc thời gian thực.</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors">
              Mở camera
            </button>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-600">
                {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Chủ đề giao diện</h3>
                <p className="text-sm text-gray-500">Chuyển đổi giữa chế độ Sáng và Tối.</p>
              </div>
            </div>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              style={{ backgroundColor: isDarkMode ? '#3b82f6' : '#e5e7eb' }}
            >
              <span 
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}`}
              />
            </button>
          </div>

          {/* Logout */}
          <div className="flex items-center justify-between p-4 border border-red-100 rounded-xl hover:bg-red-50 transition-colors mt-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-600">
                <LogOut className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-red-600">Đăng xuất</h3>
                <p className="text-sm text-red-400">Đăng xuất khỏi tài khoản hiện tại.</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors">
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

  return (
    <div className="flex h-screen bg-[#eaf4f4] font-sans text-gray-800 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white flex flex-col shadow-sm z-10">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-[#3b82f6] tracking-tight">koufuku</h1>
          <p className="text-xs text-gray-500 mt-1">Nâng cao Hạnh phúc Học đường</p>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${currentView === 'dashboard' ? 'bg-[#dceaea] text-gray-800' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Home className={`w-5 h-5 ${currentView === 'dashboard' ? 'text-gray-800' : 'text-gray-600'}`} />
            Dashboard
          </button>
          <button 
            onClick={() => setCurrentView('students')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${currentView === 'students' ? 'bg-[#dceaea] text-gray-800' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Users className={`w-5 h-5 ${currentView === 'students' ? 'text-gray-800' : 'text-gray-600'}`} />
            Danh sách Học sinh
          </button>
          <button 
            onClick={() => setCurrentView('alerts')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${currentView === 'alerts' ? 'bg-[#dceaea] text-gray-800' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <AlertTriangle className={`w-5 h-5 ${currentView === 'alerts' ? 'text-gray-800' : 'text-gray-600'}`} />
            Cảnh báo
          </button>
          <button 
            onClick={() => setCurrentView('reports')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${currentView === 'reports' ? 'bg-[#dceaea] text-gray-800' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <FileText className={`w-5 h-5 ${currentView === 'reports' ? 'text-gray-800' : 'text-gray-600'}`} />
            Báo cáo
          </button>
          <button 
            onClick={() => setCurrentView('resources')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${currentView === 'resources' ? 'bg-[#dceaea] text-gray-800' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <BookOpen className={`w-5 h-5 ${currentView === 'resources' ? 'text-gray-800' : 'text-gray-600'}`} />
            Nguồn tài nguyên
          </button>
          <button 
            onClick={() => setCurrentView('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${currentView === 'settings' ? 'bg-[#dceaea] text-gray-800' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Settings className={`w-5 h-5 ${currentView === 'settings' ? 'text-gray-800' : 'text-gray-600'}`} />
            Cài đặt
          </button>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-2">
            <img 
              src="https://picsum.photos/seed/baominh/40/40" 
              alt="Bảo Minh" 
              className="w-10 h-10 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
            <span className="font-medium text-sm">Bảo Minh</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 flex items-center justify-end px-8 gap-6 bg-white/50 backdrop-blur-sm">
          <button className="text-gray-500 hover:text-gray-700">
            <Search className="w-5 h-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-700 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
            <User className="w-5 h-5" />
          </button>
        </header>

        {/* Dashboard Content */}
        {currentView === 'dashboard' ? (
        <div className="flex-1 overflow-auto p-8">
          <h2 className="text-2xl font-bold mb-6">Dashboard Tổng quan</h2>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-[#dcfce7] rounded-2xl p-4 shadow-sm flex flex-col justify-between">
              <span className="text-sm text-gray-600 font-medium">Tổng số học sinh:</span>
              <span className="text-3xl font-bold mt-2">120</span>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col justify-between">
              <span className="text-sm text-gray-600 font-medium">Lớp</span>
              <span className="text-xl font-bold mt-2">Lớp 9A, 9B</span>
            </div>
            <div className="bg-[#fef3c7] rounded-2xl p-4 shadow-sm flex flex-col justify-between">
              <span className="text-sm text-gray-600 font-medium">Học sinh cần theo dõi:</span>
              <span className="text-3xl font-bold mt-2">8</span>
            </div>
            <div className="bg-[#fce8e6] rounded-2xl p-4 shadow-sm flex flex-col justify-between relative">
              <span className="text-sm text-gray-600 font-medium">Cảnh báo cao (Đỏ):</span>
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
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-4">Học sinh được Đánh dấu</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-gray-500 border-b border-gray-100">
                      <tr>
                        <th className="pb-3 font-medium">Học sinh</th>
                        <th className="pb-3 font-medium text-center">Wellbeing</th>
                        <th className="pb-3 font-medium text-center">Đánh dấu</th>
                        <th className="pb-3 font-medium text-right">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {markedStudents.map((student) => (
                        <tr key={student.id} className="border-b border-gray-50 last:border-0">
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                                <User className="w-4 h-4" />
                              </div>
                              <span className="font-medium">{student.name}</span>
                            </div>
                          </td>
                          <td className="py-4 align-middle">
                            <div className="w-24 h-2 bg-gray-100 rounded-full mx-auto overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${student.color}`} 
                                style={{ width: `${student.wellbeing}%` }}
                              ></div>
                            </div>
                          </td>
                          <td className="py-4 text-center font-medium">
                            {student.status}
                          </td>
                          <td className="py-4 text-right">
                            <button className="px-4 py-1.5 bg-[#dceaea] text-gray-800 rounded-lg text-sm font-medium hover:bg-[#cce6e6] transition-colors">
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
                  <h3 className="text-lg font-bold">Cảnh báo Tâm lý Gần đây</h3>
                  <a href="#" className="text-xs text-gray-500 hover:text-gray-800 flex items-center">
                    Xem tất cả <ChevronRight className="w-3 h-3 ml-1" />
                  </a>
                </div>
                
                <div className="flex flex-col gap-3">
                  {recentAlerts.map((alert) => (
                    <div key={alert.id} className={`${alert.color} rounded-2xl p-4 shadow-sm flex items-start gap-3`}>
                      <div className="w-10 h-10 bg-gray-200/50 rounded-full flex items-center justify-center text-gray-600 shrink-0 mt-1">
                        <User className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm leading-snug mb-2">
                          {alert.name} - {alert.issue}
                        </p>
                        <button className="px-3 py-1 bg-white/60 hover:bg-white/80 text-gray-800 rounded-md text-xs font-medium transition-colors border border-black/5">
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
          <StudentListView />
        ) : currentView === 'alerts' ? (
          <AlertsView />
        ) : currentView === 'reports' ? (
          <ReportsView />
        ) : currentView === 'resources' ? (
          <ResourcesView />
        ) : currentView === 'settings' ? (
          <SettingsView />
        ) : null}
      </main>
    </div>
  );
}
