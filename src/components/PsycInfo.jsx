import Reveal from "./Reveal";
import AudioButton from "./AudioButton";
export default function Navbar() {
    return (
        <section className="section">

            <h1>Hỗ trợ tâm lý rất quan trọng khi đối mặt với chẩn đoán ung thư. Hãy xem các video dưới đây để tìm hiểu thêm...</h1>


            <Reveal dir="right" delay={3} style={{ marginTop: '1%', display: 'flex', flexFlow: 'row wrap', alignItems: 'stretch' }}>
                <div className="card" style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'stretch', flex: 1, height: '45vh', minWidth: '350px', overflow: 'auto' }}>
                    <AudioButton
                        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                        label="Play sample audio"
                    />
                    <h2>NHU CẦU CẦN HỖ TRỢ VÀ NHU CẦU TÂM LÝ</h2>
                    <div>
                        <blockquote style={{ fontStyle: 'italic' }}>
                            <p>
                                Thời điểm đầu tiên khi biết rằng mình bị ung thư có thể cảm thấy bị mất kiểm soát. Ngay cả như vậy thì việc bạn cần làm đó là tìm hiểu về căn bệnh mà bạn sẽ phải đối mặt, khi biết càng nhiều thì bạn sẽ cảm thấy vững tin hơn. Hãy hỏi bác sĩ bất kỳ câu hỏi nào mà bạn cảm thấy sợ sệt, lo ngại, hay không hiểu. Các cảm giác từ chối, tức giận, sợt sệt, chán nản là những cảm giác của những người đã trải qua bệnh ung thư, bạn nên chia sẻ cảm giác này với một ai đó.
                            </p>
                        </blockquote>
                        <p>— Chia sẻ của bác sĩ</p>
                    </div>
                    <p>Nhiều bệnh nhân chỉ nghĩ đến ung thư là đã hoảng hốt mất ăn, mất ngủ. Nhưng cũng có nhiều người chủ quan, khi đi khám thì đã quá muộn. Trong hoàn cảnh đó cần an ủi bệnh nhân bằng niềm tin vào chuyên môn và nghề nghiệp: Có những xét nghiệm chính xác để phát hiện ung thư, và có những biện pháp điều trị đặc hiệu.</p>
                </div>
                <div className="card" style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'stretch', flex: 1, height: '45vh', minWidth: '350px' }}>
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/S683imSoxUQ?si=EYWob3vAEYdTWoyd" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
            </Reveal>

            <Reveal dir="left" delay={4} style={{ marginTop: '1%', display: 'flex', flexFlow: 'row wrap', alignItems: 'stretch' }}>
                <div className="card" style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'stretch', flex: 1, height: '45vh', minWidth: '350px' }}>
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/Wel_vm7mJlw?si=lZYIt4ZUXtonkYCn" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
                <div className="card" style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'stretch', flex: 1, height: '45vh', minWidth: '350px', overflow: 'auto' }}>
                    <AudioButton
                        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                        label="Play sample audio"
                        position="right-bottom"
                    />
                    <h2>THIỀN VÀ YOGA TRONG UNG THƯ</h2>
                    <p>Từ xa xưa, con người đã thức hành thiền định như là một phương pháp để chăm sóc sức khỏe thể chất tinh thần và phát triển về trí tuệ. Kể tử đó đến nay đã có hàng ngàn nghiên cứu khoa học hé lộ những hiệu quả tuyệt vời của thiền định đối với sức khỏe con người.</p>
                    <p>Giảm căng thẳng dựa trên chánh niệm (MBSR) là chương trình sử dụng thiền và yoga đầu tiên trên thế giới được đưa vào cơ sở y tế để chăm sóc sức khỏe cho người bệnh. MBSR được khởi xướng vào năm 1979 bởi Giáo sư Jon Kabat-Zinn nhằm hỗ trợ điều trị cho người có bệnh mãn tính. Chương trình đã trở nên phổ biến tại nhiều bệnh viện trên khắp thế giới, được nhiều bác sĩ thực hành đã tin tưởng giới thiệu cho bệnh nhân của mình.</p>
                    <p>Trên nền tảng đó, vào năm 1996, Tiến Linda Carlson và Michael Speca – hai nhà tâm lí học lâm sàng chuyên ngành ung thư tại Canada đã phát triển chương trình thực hành MBCR chăm sóc sức khỏe tinh thần cho người bệnh ung thư. Phương pháp thực hành này đã mang lại nhiều tác động tích cực tới bệnh nhân như giảm căng thẳng, lo âu, góp phần tăng hiệu quả điều trị, thúc đẩy thái độ sống khỏe mạnh và bình an nội tâm.</p>
                    <p>Chương trình thực hành được dựa trên cuốn sách “Giải phóng ung thư bằng sức mạnh tâm trí” được nhóm các bác sĩ và giáo viên thiền, yoga biên và dịch và xuất bản sang tiếng Việt vào tháng 4/2021. Cũng từ cuốn sách này nhóm chuyên gia và đội ngũ giáo viên thiền, yoga đã phát triển thành công chương trình thực hành đầu tiên tại VN, hướng dẫn thiền và yoga cho người bệnh ung thư dựa trên cơ sở khoa học, giúp người bệnh vượt qua những khó khăn nâng cao chất lượng cuộc sống sau 8 tuần thực hành.</p>
                </div>

            </Reveal>


            <Reveal dir="right" delay={5} style={{ marginTop: '1%', display: 'flex', flexFlow: 'row wrap', alignItems: 'stretch' }}>
                <div className="card" style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'stretch', flex: 1, height: '45vh', minWidth: '350px', overflow: 'auto' }}>
                    <AudioButton
                        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                        label="Play sample audio"
                    />
                    <h2>NHU CẦU HỖ TRỢ VÀ NHU CẦU TÂM LÝ</h2>
                    <p>Trợ giúp tâm lý xã hội là một phần thiết yếu trong chăm sóc bệnh nhân ung thư, nên được cung cấp cho tất cả các bệnh nhân ung thư và gia đình họ. Trợ giúp này bao gồm mọi khía cạnh xã hội, tài chính, tâm lý, tình cảm, tinh thần, sinh hoạt hàng ngày, trong mọi giai đoạn của bệnh ung thư. Trong những thập kỷ gần đây, ngày càng có nhiều bằng chứng chứng tỏ hiệu quả của phương pháp tiếp cận từng bước cho phép chúng ta có những can thiệp đáp ứng được đúng đối tượng và nhu cầu của người bệnh và người thân của họ. Phương pháp này bao gồm sàng lọc, đánh giá và triển khai can thiệp. Trong bài giảng, PGS.TS Eicher đã đưa ra các phương pháp xây dựng và thực hiện các can thiệp tâm lý xã hội trong chăm sóc ung thư dưới góc độ tiếp cận lấy bệnh nhân làm trung tâm.</p>
                    <p>Nói tới điều trị ung thư, phần lớn đều nghĩ tới hóa trị, xạ trị mà không biết rằng liệu pháp tâm lý cũng có vai trò vô cùng quan trọng nhưng đang bị xem nhẹ. Thực tế, có tới 82% người bệnh có nhu cầu được tư vấn lâm lý để giải tỏa lo âu, trầm cảm. Điều này cho thấy tầm quan trọng của trị liệu tâm lý cho bệnh nhân ung thư.</p>
                    <p></p>
                </div>
                <div className="card" style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'stretch', flex: 1, height: '45vh', minWidth: '350px' }}>
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/nyfWTmPd9fk?si=jAzg5SvEIuhzxQzz" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
            </Reveal>



            <Reveal dir="left" delay={6} style={{ marginTop: '1%', display: 'flex', flexFlow: 'row wrap', alignItems: 'stretch' }}>
                <div className="card" style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'stretch', flex: 1, height: '45vh', minWidth: '350px' }}>
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/Z7MouFvXUK0?si=ojIgRtXVzDqptcey" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
                <div className="card" style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'stretch', flex: 1, height: '45vh', minWidth: '350px', overflow: 'auto' }}>
                    <AudioButton
                        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                        label="Play sample audio"
                        position="right-bottom"
                    />
                    <h2>CÁC GIAI ĐOẠN TÂM LÝ CỦA BỆNH NHÂN UNG THƯ</h2>
                    <h3>GIAI ĐOẠN ĐI THĂM KHÁM BỆNH</h3>
                    <p>Nhiều bệnh nhân chỉ nghĩ đến ung thư là đã hoảng hốt mất ăn, mất ngủ. Nhưng cũng có nhiều người chủ quan, khi đi khám thì đã quá muộn. Trong hoàn cảnh đó cần an ủi bệnh nhân bằng niềm tin vào chuyên môn và nghề nghiệp: Có những xét nghiệm chính xác để phát hiện ung thư, và có những biện pháp điều trị đặc hiệu.</p>
                    <p>Khi người bệnh có những thái độ không phù hợp như: Quan trọng hóa vấn đề, quá lo lắng, chối bỏ sự thật cần động viên họ, và đảm bảo với họ rằng sẽ có được chăm sóc y tế tốt nhất, chẩn đoán chính xác và nhanh chóng, điều trị có tiên lượng tốt.</p>
                    <h3>GIAI ĐOẠN CHẨN ĐOÁN BỆNH</h3>
                    <p>Khi phát hiện ra bệnh người bệnh thường có các phản ứng như:</p>
                    <ul>
                        <li>Choáng váng, mất lòng tin: phản ứng này đôi khi nặng nề tới mức không thể nói được gì thêm về các kế hoạch điều trị. Bác sĩ lúc này phải có thái độ hỗ trợ và một buổi hẹn khác là cần thiết.</li>
                        <li>Chối bỏ sự thật: Đây cũng là phản ứng bình thường không cần phải xác định thêm.</li>
                        <li>Tức giận: Lúc này bệnh nhân cần được động viên tránh các thái độ thù địch với thầy thuốc, gia đình, bạn bè, tôn giáo. Bác sĩ tuyệt đối không được biểu hiện tức giận như là cuộc khiêu khích cá nhân.</li>
                        <li>Lo lắng: Sự hỗ trợ về tình cảm, những đảm bảo về chăm sóc sẽ làm nhẹ đi, tạo ra mối lo lắng có hiểu biết.</li>
                        <li>Thất vọng: Một nỗi thất vọng, đau buồn có thể xảy ra, nếu sự bi quan nặng nề cần được can thiệp.</li>
                        <li>Chối bỏ sự thật thái quá: Điều này ảnh hưởng tới điều trị cho bệnh nhân, cần thảo luận với bệnh nhân, nếu thấy không ổn phải khám tâm thần.</li>
                        <li>Thất vọng và chán trường: Nỗi thất vọng có thể xuất hiện bất cứ lúc nào sau khi được chẩn đoán ung thư. Các triệu chứng thần kinh thực vật như chán ăn, đoản hơi, mất ngủ và các triệu chứng tâm thần như thất vọng, mất tập trung, hoang tưởng tội lỗi cho thấy nỗi thất vọng sâu sắc. Thêm nữa, bệnh nhân có thể từ chối điều trị nếu như suy nghĩ là không tránh được cái chết. Trong trường hợp này, việc tham khảo chuyên khoa tâm thần sớm là cần thiết.</li>
                        <li>Việc dùng các phương pháp điều trị có thể không tác dụng nhưng không gây đau đớn phối hợp với điều trị chuẩn không nên phản đối. Tuy nhiên khi bệnh nhân ham muốn khỏi bệnh nhanh, xa rời những điều trị đúng đắn, lạc hướng vào các thủ pháp lang băm cần được khám tâm thần để hiệu chỉnh tâm lý.</li>
                    </ul>
                </div>

            </Reveal>


        </section>
    )
}