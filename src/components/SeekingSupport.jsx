import Reveal from "./Reveal";


export default function SeekingSupport() {
  const base = import.meta.env.BASE_URL || '/'; // to work locally and on GitHub
  return (
    <section className="section">
      <h1>Tìm kiếm sự hỗ trợ là điều quan trọng. Hãy xem các video bên dưới để tìm hiểu thêm...</h1>
      <Reveal dir="right" delay={3} style={{ marginTop: '1%', display: 'flex', flexFlow: 'row wrap', alignItems: 'stretch', justifyContent: 'center' }}>
        <div className="card" style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'stretch', justifyContent: 'center', flex: 1, height: '45vh', minWidth: '350px', overflow:'auto'}}>
          <h2>NHỮNG LỜI KHUYÊN ĐẦU TIÊN KHI CHẨN ĐOÁN UNG THƯ</h2>
          <p>Cách để đối mặt với việc nhận được tin mình mắc bệnh ung thư.</p>
          
          <ul>
            <li>Điều thứ nhất: Bạn và gia đình cần giữ bình tĩnh, tỉnh táo.</li>
            <li>Điều thứ 2: hãy chuẩn bị đầy đủ tư liệu y tế của chính bạn.</li>
            <li>Điều thứ 3: Khi gặp được bác sĩ để được tư vấn, hãy nghe kỹ các thông tin mà bác sĩ cung cấp.</li>
          </ul>
          <p>Xem video tại đây để tìm hiểu thêm.</p>
        </div>
        <div className="card" style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'stretch', justifyContent: 'center', flex: 1, height: '45vh', minWidth: '350px' }}>
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/GMa0VP3MrMo?si=Kx5eWYNTSMQwb92a" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </Reveal>




      <Reveal dir="left" delay={3} style={{ marginTop: '1%', display: 'flex', flexFlow: 'row wrap', alignItems: 'stretch', justifyContent: 'center' }}>
        <div className="card" style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'center', justifyContent: 'center', flex: 1, height: '45vh', minWidth: '350px', overflow:'auto'}}>
          <img src={`${base}/images/hospitalSeekingSupport.jpg`}/>
        </div>
        <div className="card" style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'stretch', justifyContent: 'center', flex: 1, height: '45vh', minWidth: '350px', overflow:'auto'}}>
          <h2>TÌM KIẾM SỰ HỖ TRỢ TẠI CÁC BỆNH VIỆN</h2>
          <ul>
            <li><a href="https://benhvienungbuou.vn/">Bệnh viện ung bướu TP. Hồ Chí Minh</a></li>
            <li><a href="https://benhvienk.vn/huong-dan-danh-cho-nguoi-benh-kham-co-bhyt-va-giay-chuyen-tuyen-tai-benh-vien-k-nd91075.html">Bệnh viện K (Khám có bảo hiểm)</a></li>
            <li><a href="https://benhvienk.vn/huong-dan-danh-cho-nguoi-benh-kham-khong-co-the-bhyt-kham-tu-nguyen-kham-theo-yeu-cau-tai-benh-vien-k-nd91076.html">Bệnh viện K (Khám không có bảo hiểm)</a></li>
            <li><a href="https://bvubct.vn/index.php/vi/news/">Bệnh viện ung bướu Cần Thơ</a></li>
            <li><a href="https://benhvienungbuoudanang.com.vn/">Bệnh viện ung bướu Đà Nẵng</a></li>
            <li><a href="https://bvtwhue.com.vn/Danhmuc/Baiviet/?lang=vi&ID=86#">Bệnh viện Trung ương Huế - Trung tâm ung bướu</a></li>
           </ul>
           <p>Xem video tại đây để tìm hiểu thêm.</p>
        </div>
      </Reveal>


        <Reveal dir="right" delay={3} style={{ marginTop: '1%', display: 'flex', flexFlow: 'row wrap', alignItems: 'stretch', justifyContent: 'center' }}>
        <div className="card" style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'stretch', justifyContent: 'center', flex: 1, height: '45vh', minWidth: '350px', overflow:'auto' }}>
          <h2>PHẪU THUẬT TRONG UNG THƯ</h2>
          <p>Phẫu thuật được sử dụng để ngăn ngừa, chẩn đoán, giai đoạn và điều trị ung thư. Phẫu thuật cũng có thể làm giảm sự khó chịu hoặc các vấn đề liên quan đến ung thư.</p>
          <p>Xem video tại đây để tìm hiểu thêm.</p>
          </div>
        <div className="card" style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'stretch', justifyContent: 'center', flex: 1, height: '45vh', minWidth: '350px' }}>
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/3H5ww9qQmdQ?si=biU2tz-Xttv20u7X" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </Reveal>


      <Reveal dir="left" delay={3} style={{ marginTop: '1%', display: 'flex', flexFlow: 'row wrap', alignItems: 'stretch', justifyContent: 'center' }}>
        <div className="card" style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'stretch', justifyContent: 'center', flex: 1, height: '45vh', minWidth: '350px' }}>
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/GMa0VP3MrMo?si=d28lWvO8eCZPRWXk" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
        <div className="card" style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'stretch', justifyContent: 'center', flex: 1, height: '45vh', minWidth: '350px', overflow:'auto' }}>
          <h2>VAI TRÒ CỦA HÓA TRỊ TRONG UNG THƯ</h2>
          <p>Hóa trị là phương pháp điều trị ung thư bằng cách sử dụng các loại thuốc hóa chất gây độc tế bào để tiêu diệt tế bào ung thư. Bạn có thể sẽ nhận được nhiều hơn một loại thuốc hóa học. Điều này được gọi là hóa trị liệu kết hợp. Các loại thuốc phối hợp với nhau để tiêu diệt nhiều tế bào ung thư.</p>
          <p>Xem video tại đây để tìm hiểu thêm.</p>
        </div>
      </Reveal>


        <Reveal dir="right" delay={3} style={{ marginTop: '1%', display: 'flex', flexFlow: 'row wrap', alignItems: 'stretch', justifyContent: 'center' }}>
        <div className="card" style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'stretch', justifyContent: 'center', flex: 1, height: '45vh', minWidth: '350px', overflow:'auto' }}>
          <h2>XẠ TRỊ TRONG UNG THƯ</h2>
          <p>
            Điều trị xạ trị là phương pháp dùng bức xạ ion hóa có năng lượng cao để điều trị bệnh ung thư, là phương pháp điều trị vùng, là một trong các PP chính ĐT ung thư.
            
          </p>
          <p>Xem video tại đây để tìm hiểu thêm.</p></div>
        <div className="card" style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'stretch', justifyContent: 'center', flex: 1, height: '45vh', minWidth: '350px' }}>
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/VM7EAGSw4d8?si=pi0R61wZjYSY_0m0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </Reveal>
    </section>
  )
}
