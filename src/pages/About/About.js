import React from "react";
import "./About.css";

export default function SearchTrip() {
  var name = "DT-Booking";
  const list = [
    {
      img: "https://panoquangcao.net/wp-content/uploads/2017/06/photo-6-1497718213219.jpg",
      detail:
        "Công ty DT-Booking được thành lập năm 2022. Tuy chỉ trải qua hơn 1 năm phát triển đặt khách hàng làm trọng tâm, chúng tôi tự hào trở thành doanh nghiệp vận tải đóng góp tích cực vào sự phát triển chung của ngành vận tải nói riêng và nền kinh tế đất nước nói chung.Luôn cải tiến mang đến chất lượng dịch vụ tối ưu nhất dành cho khách hàng. ",
    },
    {
      img: "https://cdn.presstv.ir/photo/20170213/10e0ab95-c983-473f-9e76-0312988d2d6b.jpg",
      detail:
        "Tuân thủ phương châm “Chất lượng là danh dự”, Công ty xe khách DT-Booking Bus Lines hiện đang khai thác hơn 60 tuyến vận tải hành khách liên tỉnh cố định trải dài từ Nam ra Bắc với hơn 200 phòng vé và trạm trung chuyển, hơn 1,800 đầu xe các loại, phục vụ hơn 20 triệu lượt khách mỗi năm",
    },
    {
      img: "https://jobsgo.vn/blog/wp-content/uploads/2021/07/shipper-la-gi-4-1.jpg",
      detail:
        "Song hành cùng sự phát triển của xe khách DT-Booking, chúng tôi nhận thấy một nhu cầu tất yếu là vận chuyển hành hóa đi kè với hành khách và hàng hóa không đi kèm với hành khách . Đáp ứng nhu cầu cũng như sự tin tưởng của khách hàng dành cho DT-Booking, Công ty Dịch vụ chuyển phát nhanh Daily transport - DT-Express được thành lập. Qua chỉ hơn nửa năm phát triển, DT-Express dần trở thành đơn vị vận chuyển hàng hóa đáng tin cậy, hỗ trợ khách hàng giao thương, trao gửi hàng hóa và phát triển kinh doanh. DT-Express đã và đang đầu tư thêm nhiều phong giao dịch , phương tiện và dịch vụ vận chuyển riêng biệt đảm bảo phụ vụ khách hàng một cách nhanh chóng và an toàn nhất.",
    },
    {
      img: "https://chikucab.com/images/volvo-bus-banner-chiku.jpg",
      detail:
        "Lĩnh vưc xe buýt là mảnh ghép quan trọng trong chuỗi hoạt động chính của Công ty DT-Booking hướng đến. Đầu tư vào những dòng xe đời mới chất lượng cao, xe buýt DT-Booking mang đến cho hành khách đầy đủ tiện nghi như máy lạnh , wifi cùng với đội ngũ tài xế, nhan viên chuyên nghiệp. Xe buýt Daily Transport cam kết mang đến cho khách hàng một chuyến đi an toàn , thoải mái với mức giá phù hợp. Hiện nay xe buýt DT-Booking đã có mặt tại các thành phố lớn như Huế, Nha Trang, Đà Lạt, Cần Thơ. Trong tương lai, xe buýt DT-Booking đặt mục tiêu phủ rộng khắp các tỉnh thành trên cả nước, đáp ứng tối đa nhu càu đi lại của người dân, giảm phương tiện cá nhân, góp phần tha đổi bộ mặt giao thông theo hướng hiện đại tinh giản hơn.",
    },
    {
      img: "https://i.ytimg.com/vi/rbbU0IgmyXg/maxresdefault.jpg",
      detail:
        "Hiểu được nhu cần nghỉ ngơi, thư giãn của hành khách trên cá hành trình dài qua nhiều tỉnh, thành phố, Công Ty DT-Booking cùng với sự hợp tác của Công ty Phương Trang đã đầu tư vào hệ thống trạm dừng Phúc Lộc tại các khu vự trọng điểm như Tiền Giang, Lâm Đồng,... Hệ thống Trạm dừng Phúc Lộc được đầu tư toàn diện, đảm bảo phục vụ lượng lớn khách hàng 24/7. Các Trạm dừng Phúc Lộc mang đến nhiều món ăn hấp dẫn, phong phú , phù hợp với khẩu vị đa dạng của hành khách. Bên trong trạm dừng còn có các gian hàng đặc sản như trái cây theo mùa hoặc các loại bánh kẹo đặc trưng của từng vùng miền, nơi khách hàng có thể thưởng thức tại chỗ hoặc mua về làm quà cho người thân",
    },
  ];
  const listTamNhin = [];
  return (
    <div className="container about">
      <div className="row">
        <div className="col-lg-12">
          <h1 className="text-center color-red font-weight-bold-uppercase">
            {name}
          </h1>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <h3 className="text-center">"Chất Lượng là danh dự"</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <h3 className="">Giới Thiệu</h3>
        </div>
      </div>
      <div className="row">
        {list.map((trip, index) => (
          <div className="col-lg-12">
            <div className="">
              <img src={trip.img} alt="Ảnh"></img>
              <div className="blockquote">{trip.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
