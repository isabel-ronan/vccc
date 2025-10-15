import Reveal from "./Reveal";
export default function Nutrition() {
  return (
    <section className="section">

      <h1>Dinh dưỡng rất quan trọng đối với bất kỳ căn bệnh nào. Hãy xem các video dưới đây để tìm hiểu thêm...</h1>
      <Reveal dir="left" delay={3} style={{ marginTop: '1%', display: 'flex', flexFlow: 'row wrap', alignItems: 'stretch', justifyContent: 'center' }}>
        <div className="card" style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'stretch', justifyContent: 'center', flex: 1, height: '65vh', minWidth: '350px' }}>
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/SC6XBghEuRw?si=KPsiLR0MrH1FNDE8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
        <div className="card" style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'stretch', flex: 1, height: '65vh', minWidth: '350px', overflow: 'auto' }}>
          <h2>DINH DƯỠNG CHO NGƯỜI BỆNH UNG THƯ</h2>
          <p>Ung thư là một trong những nguyên nhân gây tử vong hàng đầu trên thế giới và đang ngày càng gia tăng rất nhanh ở Việt Nam. Một trong những điều quan trọng là bệnh thường được phát hiện ở giai đoạn khá muộn, cùng với đau đớn là tâm lý khủng hoảng, rối loạn giấc ngủ, làm cho người bệnh bị suy sụp, chán ăn, mệt mỏi và nhanh chóng dẫn tới tình trạng suy dinh dưỡng. Ung thư có thể ảnh hưởng đến tình trạng dinh dưỡng, và ngược lại, tình trạng dinh dưỡng kém cũng ảnh hưởng đến các đáp ứng điều trị, các phương pháp điều trị, cũng như ảnh hưởng đến chất lượng cuộc sống của bệnh nhân ung thư.</p>
          <p>Sự giảm cân của bệnh nhân ung thư là do tác động nhiều yếu tố: như tâm lý, sự chán ăn, tác động từ khối u, tác dụng phụ của các liệu pháp điều trị.
            Sụt cân nhiều hay suy dinh dưỡng nặsng tác động nhiều bất lợi cho bệnh nhân ung thư như sau:</p>
          <ul>
            <li>Vết mổ chậm lành, tăng nguy cơ nhiễm trùng sau phẫu thuật.</li>
            <li>Dễ bị tăng độc tính và biến chứng của hoá, xạ trị.</li>
            <li>Kéo dài thời gian nằm viện, tăng các chi phí điều trị.</li>
            <li>Điều trị bệnh nhân ung thư có thể bị tạm ngưng hoặc ngưng hẳn.</li>
            <li>Chất lượng cuộc sống kém, nguy cơ tử vong cao.</li>
            <li>Suy dinh dưỡng ảnh hưởng nhiều đến việc điều trị của bệnh nhân, vì bệnh nhân có thể suy dinh dưỡng nên không chịu nổi các liệu pháp điều trị tối ưu nên bác sĩ buộc phải giảm liều hoặc tạm ngưng điều trị để chăm sóc dinh dưỡng tích cực.</li>
          </ul>
          <p>Vì vậy, chế độ dinh dưỡng hợp lý cho bệnh nhân ung thư rất là quan trọng và cần được quan tâm ngay từ ban đầu: trước, trong và sau quá trình điều trị.</p>
          <p>Xem video tại đây để tìm hiểu thêm.</p>

        </div>

      </Reveal>

      <Reveal dir="right" delay={4} style={{ marginTop: '1%', display: 'flex', flexFlow: 'row wrap', alignItems: 'stretch', justifyContent: 'center' }}>

        <div className="card" style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'stretch', flex: 1, height: '65vh', minWidth: '350px', overflow: 'auto' }}>
          <h2>VẬY BỆNH NHÂN UNG THƯ CẦN ĂN GÌ, ĂN NHƯ THẾ NÀO?</h2>
          <p>Chúng ta nên biết rằng mục đích của việc điều trị dinh dưỡng là để cung cấp đầy đủ năng lượng và các chất dinh dưỡng cho cơ thể duy trì mọi hoạt động sống, giúp hồi phục suy dinh dưỡng và tăng khả năng đáp ứng điều trị, giảm các biến chứng và tăng cường chất lượng cuộc sống. Vì vậy vai trò của người nhà bệnh nhân và nhân viên y tế rất quan trọng trong chăm sóc dinh dưỡng cho bệnh nhân hằng ngày.</p>
          <h2>VẬY BỆNH NHÂN UNG THƯ NÊN ĂN GÌ?</h2>
          <ul>
            <li>Đầu tiên là thức ăn giàu chất đạm như: thịt, cá, trứng, sữa, ngũ cốc, hay các loại hạt… Trong đó, bệnh nhân nên ăn thịt trắng, đậu đỗ, trứng và sữa là thường xuyên.</li>
            <li>Thứ hai là bệnh nhân nên ăn thức ăn giàu chất béo. Bệnh nhân nên sử dụng dầu hay cho mỡ. Các loại dầu tốt cho bệnh nhân như: dầu oliu, dầu cải, dầu phộng, dầu nành, dầu cá…</li>
            <li>Thực phẩm thứ ba là các loại tinh bột như: gạo, mì, ngô, khoai, sắn, bún, bánh phở… Nếu bệnh nhân ung thư kèm với đái tháo đường thì nên ăn các loại tinh bột còn cám như gạo lứt, bánh mì đen, yến mạch…</li>
            <li>Thứ tư là chất xơ. Chất xơ rất quan trọng trong việc tăng cường chức năng tiêu hoá, giảm cholesterol máu, kiểm soát đường huyết cho bệnh nhân được tốt hơn.</li>
            <li>Và thứ năm chính là nước. Nước rất cần để duy trì sự sống. Trung bình người bệnh cần uống khoảng 1,5 – 2 lít nước (tức là tương ứng với 8 ly nước) và nên tăng thêm trong trường hợp bị nôn ói hay tiêu chảy.</li>
            <li>Thứ sáu là chất khoáng và vitamin. Dù cơ thể cần một lượng rất nhỏ các vitamin và chất khoáng nhưng chúng lại rất quan trọng trong quá trình tạo máu, chuyển hoá men, miễn dịch, lành sẹo. Vitamin, chất khoáng có nhiều trong trái cây, rau xanh, hoa quả tươi và ngũ cốc.</li>
          </ul>
        </div>
        <div className="card" style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'stretch', justifyContent: 'center', flex: 1, height: '65vh', minWidth: '350px' }}>
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/5hMr2WtKALQ?si=cm4FhGuTtlrvagld" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>

      </Reveal>

      <Reveal dir="left" delay={5}>
        <h2></h2>
        <div className='card'>

          <h2>VẬY BỆNH NHÂN KHÔNG NÊN ĂN GÌ?</h2>
          <p>Bệnh nhân ung thư thì nên hạn chế dùng các thực phẩm chứa nhiều axit béo như mỡ động vật, thịt nướng, thịt hun khói, món xào rán, bánh chả… Các thực phẩm chế biến công nghiệp, đóng gói sẵn như: đồ hộp, thịt nguội… Và hạn chế uống nước chè ban đêm. Không nên dùng dầu mỡ rán đi rán lại nhiều lần, thực phẩm muối lên men như thịt muối, dưa muối, cà muối … thì cũng không nên dùng. Các loại thực phẩm nấm mốc như lạc mốc, đậu đỗ mốc, hạt bí mốc… thì cũng không nên dùng. Và hạn chế sử dụng các chất kích thích như rượu, bia, thuốc lá.</p>
          <h2>BỆNH NHÂN ĐƯỢC ĐIỀU TRỊ DINH DƯỠNG TẠI BỆNH VIỆN NHƯ THẾ NÀO?</h2>
          <div>
            <blockquote style={{ fontStyle: 'italic' }}>
              <p>
                Lần đầu tiên tôi đưa vợ đến khám và điều trị ở đây, chúng tôi rất là bỡ ngỡ. Vợ của tôi bị khối u (ở …. ???). Chế độ ăn uống đều không biết như thế nào là phù hợp để phục vụ cho người bệnh. Thì bác sĩ, y tá ở đây đã tư vấn lại cho mình, họ hướng dẫn các loại thức ăn giàu dinh dưỡng, giàu đạm như thịt, cá, sữa… Khi cần cho bệnh nhân cần được cho ăn, cho uống cái gì họ sẵn sàng tư vấn ăn uống đầy đủ. Thì lúc đó tôi mới bình tĩnh lại.
              </p>
            </blockquote>
            <p>— Người nhà bệnh nhân</p>
          </div>

          <div>
            <blockquote style={{ fontStyle: 'italic' }}>
              <p>
              Bệnh nhân ung thư đến khám và điều trị cúng sẽ được bác sĩ, nhân viên y tế sàng lọc, đánh giá tình trạng dinh dưỡng và xác định nguy cơ có suy dinh dưỡng hay là không. Sau đó sẽ chỉ định mã chế độ ăn để phù hợp với từng tình trạng bệnh lý của bệnh nhân. Những bệnh nhân có nguy cơ suy dinh dưỡng cao sẽ được bác sĩ điều trị hội chẩn với bác sĩ dinh dưỡng để đưa một kế hoạch can thiệp hợp lý cho bệnh nhân ung thư. Một số bệnh nhân ung thư cũng sẽ được khám và tư vấn dinh dưỡng để đưa ra những thực đơn cụ thể, lên kế hoạch rõ ràng, chi tiết, và hướng dẫn người nhà, bệnh nhân lựa chọn thực phẩm, cách chế biến thực phẩm và cách ăn uống như thế nào cho đúng tại nhà cũng như trên bệnh viện trong quá trình điều trị.  
              </p>
            </blockquote>
            <p>— Bác sĩ</p>
          </div>

          <h2>TÓM TẮT</h2>
          <p>Chung quy lại, bệnh nhân cũng như người nhà cần giữ vững 4 nguyên tắc dinh dưỡng sau và duy trì suốt quá trình điều trị:</p>
          <ul>
            <li>Ăn uống đầy đủ và cân đối.</li>
            <li>Cần ăn 3 bữa chính kèm với 1-2 bữa phụ (phù hợp nhất là có thể sử dụng sữa dành cho bệnh nhân ung thư).</li>
            <li>Tăng cường lượng đạm từ thịt, cá, trứng, sữa, đậu đỗ và vitamin, khoáng chất từ trái cây, rau củ quả.</li>
            <li>Đồng thời chọn cho mình 1 phương pháp tập luyện phù hợp nhất cho độ tuổi và sức khoẻ, mà phổ biến nhất là đi bộ từ 15-30 phút/lần và khoảng 5 lần mỗi tuần.</li>
          </ul>
          <p>Việc duy trì một thể trạng tốt cho bệnh nhân ung thư là một nhiệm vụ hết sức quan trọng. Vì vậy tôi hy vọng rằng những kiến thức hữu ích vừa rồi đã có thể giúp ích được cho người nhà và bệnh nhân trong quá trình chăm sóc dinh dưỡng được hiệu quả và toàn vẹn hơn. Xin trân trọng cảm ơn và hẹn gặp lại.</p>
        </div>
      </Reveal>

    </section>
  )
}
