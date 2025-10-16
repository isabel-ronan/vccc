import Reveal from "./Reveal.jsx";
import AudioButton from "./AudioButton.jsx";

export default function DailyCare() {
  const base = import.meta.env.BASE_URL || '/'; // to work locally and on GitHub
  return (
    <section className="section">
      <h1>Những người chăm sóc cho biết việc chăm sóc bệnh nhân ung thư hàng ngày là một phần quan trọng trong cuộc sống của họ. Hãy xem các video dưới đây để tìm hiểu thêm...</h1>
      <Reveal dir="right" delay={3} style={{ marginTop: '1%', display: 'flex', flexFlow: 'row wrap', alignItems: 'stretch', justifyContent: 'center' }}>
        <div className="card" style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'stretch', justifyContent: 'center', flex: 1, height: '45vh', minWidth: '350px', overflow: 'auto' }}>
          <AudioButton src={`${base}sound/narration/dailyCareOne.mp3`} label="Daily care one"/>

          <h2>NGƯỜI CHĂM SÓC</h2>
          <p>Người nhà có vai trò chăm sóc chính cho bệnh nhân ung thư. Tại bệnh viện điều dưỡng viên cùng phối hợp với người nhà chăm sóc cho bệnh nhân. Người nhà có thể chia sẻ với điều dưỡng viên về:</p>

          <ul>
            <li>Các vấn đề liên quan đến sinh hoạt thường ngày và gia đình</li>
            <li>Các vấn đề liên quan tới cảm xúc: sợ hãi, lo lắng buồn chán, căng thẳng…</li>
            <li>Các vấn đề về thể chất:  hình ảnh bản thân, cách ăn mặc; chứng khó tiêu; giảm sự tập trung và trí nhớ; bị lở loét ở miệng…</li>
          </ul>
          <p>Xem video tại đây để tìm hiểu thêm.</p>
        </div>
        <div className="card" style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'stretch', justifyContent: 'center', flex: 1, height: '45vh', minWidth: '350px' }}>
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/Jvn2tn65eew?si=WpX4g6glSW6DKEfv" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </Reveal>


      <Reveal dir="left" delay={4} style={{ marginTop: '1%', display: 'flex', flexFlow: 'row wrap', alignItems: 'stretch', justifyContent: 'center' }}>
        <div className="card" style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'stretch', justifyContent: 'center', flex: 1, height: '45vh', minWidth: '350px' }}>
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/GNnJVvdjCVE?si=C05DvxgAaJozVgjF" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
        <div className="card" style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'stretch', justifyContent: 'center', flex: 1, height: '45vh', minWidth: '350px', overflow: 'auto' }}>
          <AudioButton src={`${base}sound/narration/dailyCareTwo.mp3`} label="Daily care two"/>

          <h2>MỘT NGÀY CỦA NGƯỜI BỆNH UNG THƯ</h2>

          <p>Người chăm sóc có thể hỗ trợ nhiều cách khác nhau, bao gồm chăm sóc y tế, chăm sóc cơ bản hàng ngày, chăm sóc tâm lý và xã hội. Người chăm sóc có thể hỗ trợ bằng cách đưa bệnh nhân đến khám bác sĩ, tìm kiếm các hỗ trợ y tế cho người bệnh, nấu ăn, hỗ trợ bệnh nhân trong sinh hoạt hàng ngày. giúp đỡ người bệnh đối phó với các vấn đề tâm lý như lo lắng, trầm cảm. Sự động viên, khuyến khích của người chăm sóc sẽ giúp bệnh nhân tuân thủ quá trình điều trị, chế độ ăn uống và nghỉ ngơi hợp lý.</p>

          <p>Xem video tại đây để tìm hiểu thêm.</p>
        </div>

      </Reveal>


      <Reveal dir="right" delay={5} style={{ marginTop: '1%', display: 'flex', flexFlow: 'row wrap', alignItems: 'stretch', justifyContent: 'center' }}>
        <div className="card" style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'stretch', justifyContent: 'center', flex: 1, height: '45vh', minWidth: '350px', overflow: 'auto' }}>
          <AudioButton src={`${base}sound/narration/dailyCareThree.mp3`} label="Daily care three"/>

          <h2>CHIA SẺ CỦA NGƯỜI BỆNH VỀ TỰ CHĂM SÓC</h2>
          <p>Dưới đây là chia sẻ của một người bệnh ung thư về trải nghiệm của bản thân cũng như cách tự chăm sóc.</p>
          <blockquote style={{ fontStyle: 'italic' }}>“Xin chào các bạn, Tôi tên là Kim Chi, 47 tuổi. Tôi phát hiện Ung thư vòm họng năm 2009, đến thời điểm này là 10 năm. Tôi đã vượt qua bệnh và quay trở lại cuộc sống bình thường.Tôi rất vui vì có thể chia sẻ với các bạn điều đã trải qua.”</blockquote>
          <p>Xem video tại đây để tìm hiểu thêm.</p>
        </div>
        <div className="card" style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'stretch', justifyContent: 'center', flex: 1, height: '45vh', minWidth: '350px' }}>
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/UfrngSFYVHs?si=XuTui6AWiPf7FknC" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </Reveal>
    </section>
  )
}
