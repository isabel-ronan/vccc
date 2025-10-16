import Reveal from './Reveal.jsx';
import AudioButton from './AudioButton.jsx';

export default function TraditionalMedicine() {
  const base = import.meta.env.BASE_URL || '/'; // to work locally and on GitHub
  return (
    <section className="section">
      <h1>Điều trị ung thư theo y học cổ truyền có thể mâu thuẫn với y học hiện đại. Hãy xem các video bên dưới để tìm hiểu thêm...</h1>


      <Reveal dir="right" delay={3} style={{ marginTop: '1%', display: 'flex', flexFlow: 'row wrap', alignItems: 'stretch', justifyContent: 'center' }}>
        <div className="card" style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'stretch', justifyContent: 'center', flex: 1, height: '45vh', minWidth: '350px', overflow: 'auto' }}>
          <AudioButton src={`${base}sound/narration/traditionalMedicineOne.mp3`} label="Traditional medicine one"/>
        
          <h2>KHÁI NIỆM UNG THƯ THEO Y HỌC CỔ TRUYỀN & Y HỌC HIỆN ĐẠI</h2>
          <p>Ung thư là một nhóm các bệnh liên quan đến việc tăng sinh tế bào một cách mất kiểm soát và những tế bào đó có khả năng xâm lấn những mô khác bằng cách phát triển trực tiếp vào mô lân cận hoặc di chuyển đến những bộ phận khác trong cơ thể ( di căn).</p>
          <p>Bệnh danh của ung thư trong YHCT là chứng nham, chứng nan, chứng lựu. Theo y học cổ truyền cơ chế bệnh ung thư phát sinh là do khí trệ, huyết ứ, đàm kết, tà độc, kinh lạc bế tắc, công năng tạng phủ mất điều hoà và khí huyết hư tổn.</p>
          <p>Xem video tại đây để tìm hiểu thêm.</p>
        </div>
        <div className="card" style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'stretch', justifyContent: 'center', flex: 1, height: '45vh', minWidth: '350px' }}>
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/5-1vh4_ku1I?si=RZniNUqLuys28mon" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </Reveal>


      <Reveal dir="left" delay={4} style={{ marginTop: '1%', display: 'flex', flexFlow: 'row wrap', alignItems: 'stretch', justifyContent: 'center' }}>
        <div className="card" style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'center', justifyContent: 'center', flex: 1, height: '45vh', minWidth: '350px', overflow:'auto'}}>
          <img src={`${base}/images/traditionalMedicine.png`}/>
        </div>
        <div className="card" style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'stretch', justifyContent: 'center', flex: 1, height: '45vh', minWidth: '350px', overflow: 'auto' }}>
          <AudioButton src={`${base}sound/narration/traditionalMedicineTwo.mp3`} label="Traditional medicine two"/>
        
          <h2>CÁC PHƯƠNG PHÁP ĐIỀU TRỊ Y HỌC CỔ TRUYỀN</h2>

          <p>Điều trị bằng Y học cổ truyền gồm dùng thuốc và không dùng thuốc (châm cứu, xoa bóp bấm huyệt, dưỡng sinh khí công…). Trong thuốc có thuốc nam, bắc.</p>
           
        </div>

      </Reveal>


      <Reveal dir="right" delay={5} style={{ marginTop: '1%', display: 'flex', flexFlow: 'row wrap', alignItems: 'stretch', justifyContent: 'center' }}>
        <div className="card" style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'stretch', justifyContent: 'center', flex: 1, height: '45vh', minWidth: '350px', overflow: 'auto' }}>
          <AudioButton src={`${base}sound/narration/traditionalMedicineThree.mp3`} label="Traditional medicine three"/>
        
          <h2>MỘT SỐ SAI LẦM TRONG ĐIỀU TRỊ UNG THƯ BẰNG Y HỌC CỔ TRUYỀN</h2>
          <p>Khi phát hiện bệnh thì không khám và điều trị theo chuyên khoa ung bướu mà tự ý hoặc nghe theo quảng cáo đi điều trị thuốc nam, thực phẩm chức năng bỏ lỡ cơ hội điều trị khỏi bệnh, khi bệnh nặng lên giai đoạn toàn phát mới quay lại bệnh viện thì không thể điều trị được nữa.</p>
          <p>Điều trị YHCT không đúng cách. Bệnh nhân tự dùng thuốc YHCT không phù hợp với tình trạng bệnh và  cơ thể của mình  nên không hỗ trợ được mà làm cho bệnh nặng lên.</p>
          <p>Quan điểm kết hợp điều trị YHHĐ và YHCT còn chưa thực sự  thống nhất giữa các thầy thuốc,  do  vậy nhiều bệnh nhân cũng bị lỡ mất cơ hội sử dụng thuốc YHCT hỗ trợ điều trị bệnh mặc dù điều trị bằng phương pháp YHHĐ không đáp ứng và thất bại.</p>
          <p>Xem video tại đây để tìm hiểu thêm.</p>
        </div>
        <div className="card" style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'stretch', justifyContent: 'center', flex: 1, height: '45vh', minWidth: '350px' }}>
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/YuIFhEuGazM?si=n0PTAPYXdcB0HcIx" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </Reveal>


      <Reveal dir="left" delay={6} style={{ marginTop: '1%', display: 'flex', flexFlow: 'row wrap', alignItems: 'stretch', justifyContent: 'center' }}>
        <div className="card" style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'stretch', justifyContent: 'center', flex: 1, height: '45vh', minWidth: '350px' }}>
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/Ke64gGDpoLw?si=4kZ4Y_OutIZq-zJf" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
        <div className="card" style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'stretch', justifyContent: 'center', flex: 1, height: '45vh', minWidth: '350px', overflow: 'auto' }}>
          <AudioButton src={`${base}sound/narration/traditionalMedicineFour.mp3`} label="Traditional medicine four"/>
        
          <h2>MỘT SỐ KHUYẾN NGHỊ TRONG Y HỌC CỔ TRUYỀN</h2>
          <ul>
            <li>Bệnh nhân bị bệnh ung thư cần phải được khám chuyên khoa ung bướu của YHHĐ để được chẩn đoán chính xác về giải phẫu bệnh cũng như giai đoạn  bệnh. Từ đó mới có phương pháp và liệu trình  điều trị phù hợp.</li>
            <li>Nên kết hợp YHHĐ và YHCT trong điều, chăm sóc bệnh nhân ung thư theo từng giai đoạn.</li>
            <li>Chăm sóc bệnh nhân ung thư rất quan trọng làm sao để bệnh nhân có tinh thần lạc quan, chế độ ăn uống, ngủ nghỉ khoa học phù hợp với từng bệnh nhân.</li>
            <li>Tuyệt đối không được tự ý bỏ điều trị và tự mua thuốc nam ở ngoài, hoặc làm các phương pháp điều trị tâm linh huyền bí giả danh y học cổ truyền.</li>
          </ul>
          <p>Xem video tại đây để tìm hiểu thêm.</p>
        </div>

      </Reveal>





    </section>
  )
}
