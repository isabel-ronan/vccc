import Reveal from "./Reveal";
import AudioButton from "./AudioButton";


export default function SkillsTraining() {
    const base = import.meta.env.BASE_URL || '/'; // to work locally and on GitHub
  return (
    <section className="section">

      <h1>Đào tạo kỹ năng rất quan trọng trong việc chăm sóc những người bị ảnh hưởng bởi ung thư. Hãy xem các video bên dưới để tìm hiểu về một số kỹ năng bạn có thể cần...</h1>
      <Reveal dir="right" delay={3} style={{ marginTop: '1%', display: 'flex', flexFlow: 'row wrap', alignItems: 'stretch', justifyContent: 'center' }}>
        <div className="card" style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'stretch', justifyContent: 'center', flex: 1, height: '45vh', minWidth: '350px', overflow: 'auto' }}>
          <AudioButton src={`${base}sound/narration/skillsTrainingOne.mp3`} label="Skills training one"/>
          <h2>VỆ SINH RĂNG MIỆNG & VỆ SINH THÂN THỂ</h2>
          <p>Chăm sóc và vệ sinh cho bệnh nhân là 1 nhu cầu cơ bản hằng ngày. Vệ sinh cá nhân là rất quan trọng nhằm giúp người bệnh cảm thấy thoải mái thư giãn, dễ chịu và ăn ngon, ngủ tốt. Những hỗ trợ vệ sinh thân thể người bệnh cơ bản bao gồm:</p>

          <ul>
            <li>Chăm sóc răng miệng</li>
            <li>Gội đầu</li>
            <li>Tắm</li>
          </ul>
          <p>Xem video tại đây để tìm hiểu thêm.</p>
        </div>
        <div className="card" style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'stretch', justifyContent: 'center', flex: 1, height: '45vh', minWidth: '350px' }}>
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/jljEnMts5aY?si=wfHxKw7JkRKpxnt5" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </Reveal>


      <Reveal dir="left" delay={4} style={{ marginTop: '1%', display: 'flex', flexFlow: 'row wrap', alignItems: 'stretch', justifyContent: 'center' }}>
        <div className="card" style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'stretch', justifyContent: 'center', flex: 1, height: '45vh', minWidth: '350px' }}>
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/Cz3zSeRzXNw?si=ubFDWJvrFtiSHRFI" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
        <div className="card" style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'stretch', justifyContent: 'center', flex: 1, height: '45vh', minWidth: '350px', overflow: 'auto' }}>
          <AudioButton src={`${base}sound/narration/skillsTrainingTwo.mp3`} label="Skills training two"/>
        
          <h2>CHĂM SÓC DA MÓNG</h2>

          <p>Quá trình điều trị ung thư có thể gây ra những thay đổi ở da và móng của bệnh nhân, không chỉ ảnh hưởng đến vẻ ngoài thẩm mỹ mà còn gây ra sự khó chịu và thậm chí là đau đớn. Một số thay đổi thường gặp ở móng bao gồm:</p>

          <ul>
            <li>Nứt móng, là tình trạng móng trở nên giòn và dễ bị nứt hoặc gãy.</li>
            <li>Lớp biểu bì có thể bị sưng và/hoặc đau. Nhiễm trùng móng là tình trạng viêm với các biểu hiện như sưng, nóng, đỏ và đau ở đầu các ngón tay.</li>
            <li>Móng tay vàng.</li>
          </ul>

          <p>Xem video tại đây để tìm hiểu thêm.</p>
        </div>

      </Reveal>

      <Reveal dir="right" delay={5} style={{ marginTop: '1%', display: 'flex', flexFlow: 'row wrap', alignItems: 'stretch', justifyContent: 'center' }}>
        <div className="card" style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'stretch', justifyContent: 'center', flex: 1, height: '45vh', minWidth: '350px', overflow: 'auto' }}>
          <AudioButton src={`${base}sound/narration/skillsTrainingThree.mp3`} label="Skills training three"/>
        
          <h2>HƯỚNG DẪN LĂN TRỞ</h2>

          <p>
            Lăn trở vận động là những kỹ năng đơn giản mà người bệnh và người chăm sóc có thể thực hiện được khi có sự hướng dẫn của cán bộ y tế trong quá trình điều trị.
          </p>
          <p>
            Hướng dẫn lăn trở hỗ trợ cho bệnh nhân phục hồi và duy trì sức khỏe. Với nhiều người bệnh Ung thư việc điều trị khiến họ phải nằm nhiều, ít đi ại vận động nên việc lăn trở , đi lại là rất cần thiết.
          </p>
          <p>
            Việc lăn trở cho bệnh nhân là cần thiết để đảm bảo người bệnh được vận động, giảm tì đè, giảm nguy cơ loét do tì đè.
          </p>

          <p>Xem video tại đây để tìm hiểu thêm.</p>
        </div>
        <div className="card" style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'stretch', justifyContent: 'center', flex: 1, height: '45vh', minWidth: '350px' }}>
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/cC3yrJj_4nE?si=CzKUnad94HXX_KDj" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </Reveal>

      <Reveal dir="left" delay={6} style={{ marginTop: '1%', display: 'flex', flexFlow: 'row wrap', alignItems: 'stretch', justifyContent: 'center' }}>
        <div className="card" style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'stretch', justifyContent: 'center', flex: 1, height: '45vh', minWidth: '350px' }}>
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/iXqEUypgkMI?si=hebozYiekfnK-oMQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
        <div className="card" style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'stretch', justifyContent: 'center', flex: 1, height: '45vh', minWidth: '350px', overflow: 'auto' }}>
          <AudioButton src={`${base}sound/narration/skillsTrainingFour.mp3`} label="Skills training four"/>
        
          <h2>CHĂM SÓC ỐNG THÔNG DẠ DÀY</h2>

          <p>
            Kỹ thuật đặt ống thông dạ dày có thể được chỉ định cho nhiều đối tượng ở mọi độ tuổi, quá trình chăm sóc bệnh nhân đặt ống thông dạ dày đóng vai trò quan trọng trong việc hạn chế tình trạng viêm nhiễm hay biến chứng đáng tiếc có thể xảy ra.
          </p>

          <p>Xem video tại đây để tìm hiểu thêm.</p>
        </div>


      </Reveal>

      <Reveal dir="right" delay={7} style={{ marginTop: '1%', display: 'flex', flexFlow: 'row wrap', alignItems: 'stretch', justifyContent: 'center' }}>

        <div className="card" style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'stretch', justifyContent: 'center', flex: 1, height: '45vh', minWidth: '350px', overflow: 'auto' }}>
          <AudioButton src={`${base}sound/narration/skillsTrainingFive.mp3`} label="Skills training five"/>
        
          <h2>HƯỚNG DẪN PHỤC HỒI CHỨC NĂNG</h2>

          <p>
            Phục hồi chức năng cho người bệnh ung thư là rất quan trọng do quá trình ung thư kéo dài ảnh hưởng đến thể chất, tinh thần của người bệnh cũng như chất lượng cuộc sống của bệnh nhân trong suốt quá trình điều trị. Chăm sóc phục hồi chức năng tốt sẽ giúp người bệnh cải thiện tình trạng sức khỏe, tinh thần và tái hòa nhập với xã hội.
          </p>

          <p>Xem video tại đây để tìm hiểu thêm.</p>
        </div>
        <div className="card" style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'stretch', justifyContent: 'center', flex: 1, height: '45vh', minWidth: '350px' }}>
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/rla75SWuhjg?si=Ftkbqu1_KcWRFodH" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </Reveal>


    </section>
  )
}
