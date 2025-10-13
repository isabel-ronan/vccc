import { useState } from 'react';

const slides = [
    { id: 'a', name: 'Bị ung thư không được mổ cũng như phẫu thuật làm cho tế bào ung thư lây lan nhanh hơn', content: 'Thông tin từ Bệnh viện Ung bướu Hà Nội, cho biết nhiều bệnh nhân cho rằng cứ “đụng dao kéo” sẽ chết sớm. Hoặc sinh thiết, bệnh nhân cũng không muốn làm vì sợ gieo rắc ung thư sẽ lan tới vị trí khác hay sẽ làm bệnh nặng hơn. Có rất nhiều nghiên cứu đang và sẽ được tiến hành trên nhiều loại bệnh ung thư khác nhau nhằm nâng cao tỉ lệ chữa khỏi bệnh ung thư. Phẫu thuật chia làm 2 loại là phẫu thuật giảm nhẹ triệu chứng và phẫu thuật triệt căn. Việc phẫu thuật phụ thuộc vào mức độ của bệnh bác sĩ sẽ đưa ra quyết định hướng điều trị.' },
    { id: 'b', name: 'Thay thế liệu pháp chữa trị ?', content: 'Không ít người khi biết mình bị ung thư đã không đến ngay các cơ sở y tế để điều trị, chữa bệnh tuân theo phác đồ của bác sĩ mà nghe theo các lời mách bảo truyền miệng dùng, uống các loại thuốc lá, thuốc Đông y không rõ nguồn gốc. Đây là hành động mà người bệnh vô tình làm tự đánh mất đi thời gian vàng điều trị bệnh. Không những làm chậm trễ điều trị mà còn gây rất nhiều biến chứng nguy hiểm tính mạng.' },
    { id: 'c', name: 'Những lầm tưởng về chế độ dinh dưỡng thường thấy của bệnh nhân ung thư ?', content: 'Không bồi dưỡng quá mức. Ăn đường, trứng vịt lộn làm cho tế bào ung thư phát triển nhanh. Nhịn ăn để diệt trừ hoàn toàn tế bào ung thư.' },
    { id: 'd', name: 'Bệnh ung thư có tính lây lan', content: 'Ung thư là bệnh không lây nhiễm. Bệnh không lây nhiễm qua đường máu, quan hệ tình dục, từ mẹ sang con, tiếp xúc… Vì vậy, không có lý do gì để xa lánh hay phải có biện pháp phòng tránh đối với người bệnh ung thư.' },
    { id: 'e', name: 'Đi dự đám tang làm cho bệnh di căn nhanh hoặc tái phát trở lại', content: 'Phải khẳng định rằng, đi dự đám tang sẽ không bao giờ dẫn tới việc tế bào ung thư di căn hay bệnh quay trở lại. Vì một trong những đặc tính của bệnh ung thư là tái phát và di căn. Khi đã chữa ung thư, phải luôn tuân thủ việc tái khám.' },
    { id: 'f', name: 'Sừng tê giác chữa được ung thư ?', content: 'Sừng tê giác thực chất cũng chỉ như móng tay, móng chân và hoàn toàn không thể chữa được ung thư. Sừng tê giác trong Đông y có thể giúp tăng thể lực. Việc tăng thể lực này, một viên C sủi cũng làm được.' },
];

export default function SlidingCards() {
    const [current, setCurrent] = useState(0);

    function prev() {
        setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
    }
    function next() {
        setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));
    }

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                <h3>{slides[current].name}</h3>
                <p>{slides[current].content}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <button className="btn" onClick={prev} style={{ padding: '0.5rem 1rem' }}>Previous</button>
                <button className="btn" onClick={next} style={{ padding: '0.5rem 1rem' }}>Next</button>
            </div>
        </div>
    );
}
