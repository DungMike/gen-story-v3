export const GEMINI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';
export const STYLE_PROMPT_1 = `
Phong cách kể chuyện:
1.	Giọng văn:
    o	Nghiêm túc, trang trọng: Sử dụng từ ngữ chuẩn mực, mang tính tường thuật của báo chí điều tra, thời sự.
    o	Kịch tính, lôi cuốn: Mở đầu bằng những câu hỏi gợi sự tò mò, những chi tiết "lạnh gáy", "không lời trăn trối nhưng để lại quá nhiều câu hỏi".
    o	Khách quan nhưng có cảm xúc: Tường thuật sự việc một cách chi tiết, dựa trên bằng chứng, nhưng vẫn lồng ghép những nhận định mang tính cảnh báo, suy ngẫm ở cuối truyện.
    o	Chuyên nghiệp: Sử dụng nhiều thuật ngữ chuyên ngành của công an, điều tra, pháp y (ví dụ: "đội trọng án", "phòng cảnh sát hình sự", "hiện trường được phong tỏa", "khám nghiệm tử thi", "vật chứng", "tổ trinh sát", "kỹ thuật hình sự", "pháp y", "giám định ADN", "tố tụng", "khởi tố", "viện kiểm sát").
2.	Tiết tấu:
    o	Nhanh ở đoạn mở đầu: Nhanh chóng giới thiệu vụ án, nạn nhân và những điểm bí ẩn ban đầu để thu hút ngay lập tức.
    o	Chậm rãi, chi tiết ở đoạn điều tra: Tường thuật tỉ mỉ quá trình khám nghiệm hiện trường, thu thập chứng cứ, lấy lời khai, phân tích dữ liệu. Mỗi tình tiết mới được đưa ra một cách có trình tự, logic.
    o	Đẩy cao trào ở những "nút thắt": Khi phát hiện những tình tiết quan trọng (bao tay, vết son, dữ liệu camera mâu thuẫn, sự xuất hiện của người chị song sinh).
    o	Giải quyết nhanh ở đoạn kết luận điều tra và xét xử: Khi hung thủ đã lộ diện, lời khai được trình bày, và bản án được tuyên.
    o	Lắng đọng ở phần kết: Chuyển sang suy ngẫm, đưa ra bài học, thông điệp.
3.	Phong cách kể chuyện:
    o	Tường thuật theo trình tự thời gian: Bắt đầu từ khi phát hiện vụ án, quá trình điều tra, cho đến khi xét xử và kết thúc bằng những suy ngẫm.
    o	Đan xen giữa sự kiện và phân tích: Không chỉ kể lại sự việc mà còn lồng ghép những suy luận của cơ quan điều tra, chuyên gia tâm lý tội phạm.
    o	Sử dụng nhiều chi tiết cụ thể: Ngày, giờ, địa điểm, đặc điểm nhận dạng, vật chứng được mô tả rõ ràng.
    o	Tạo bất ngờ (plot twist): Sự xuất hiện của người chị song sinh là một yếu tố bất ngờ lớn, thay đổi hướng điều tra.
    o	Dẫn dắt người đọc/nghe theo dòng suy luận của điều tra viên: Từng bước hé lộ manh mối, loại trừ nghi phạm, cho đến khi tìm ra hung thủ thật sự.
    o	Kết thúc bằng một thông điệp mang tính xã hội: Không chỉ là một vụ án hình sự đơn thuần mà còn là bài học về mối quan hệ, sự quan tâm, lắng nghe.
4.	Từ ngữ đặc trưng:
    o	Các cụm từ như: "Xin chào quý vị khán giả", "mới đây tại Hà Nội", "vậy thì rốt cuộc chuyện gì đã xảy ra", "lực lượng chức năng", "hiện trường lập tức được phong tỏa", "kết luận tử vong sơ bộ", "cán bộ điều tra tiến hành già soát", "tuy nhiên", "điều này khẳng định", "một tình tiết đáng chú ý", "dưới sức ép tâm lý", "mở ra một hướng điều tra mới", "những chi tiết nhỏ nhưng nhất quán", "bắt đầu từ đây một giả thiết mới được đặt ra", "cú sốc đầu tiên", "sự mâu thuẫn buộc tổ điều tra", "chính thức cúi đầu nhận tội", "theo lời khai", "bản án chưa tuyên nhưng sự thật đã rõ", "tòa tuyên", "vụ án khép lại... nhưng...", "câu hỏi nhức nhối".
5.  Sử dụng lối viết "Tả" thay vì "Kể" (Show, don't tell). Ví dụ: thay vì nói "Dũng cảm thấy sợ hãi", hãy miêu tả "Hơi thở của Dũng trở nên gấp gáp, mồ hôi lạnh túa ra sau gáy."
    o	Tránh lặp lại thông tin đã có ở các chương trước.
    o	Tạo ra một tình huống căng thẳng (cliffhanger) ở cuối chương. Ví dụ: Dũng tìm ra một sự thật mới nhưng bị kẻ bí ẩn phát hiện, hoặc anh ta nhận ra nạn nhân tiếp theo có thể là ai.
6.	Tuyệt đối không lặp lại bất kỳ đoạn văn nào đã được viết. Mỗi câu chữ đều phải mới và phục vụ cho việc phát triển câu chuyện.
`

// Buddhist-Detective Story Generation Constants
export const BUDDHIST_DETECTIVE_PROMPTS = {
  MASTER_NOVELIST: "Bạn là một tiểu thuyết gia và nhà kể chuyện chuyên nghiệp, có kiến thức sâu sắc về tâm lý tội phạm, triết lý Phật giáo và nghệ thuật kể chuyện phá án nhân quả.",
  
  MISSION_DESCRIPTION: "Dựa trên các thông số dưới đây, hãy viết ra một truyện hoàn chỉnh, đầy cảm xúc, logic, giàu chiều sâu, có bố cục mạch lạc, chia theo chương rõ ràng. Cốt truyện cần mang màu sắc phá án – trinh thám – nghiệp báo – sám hối.",
  
  WRITING_STYLE: "Truyện nên sử dụng ngôn ngữ văn học chậm rãi, mang tính chiêm nghiệm, dễ dựng thành kịch bản podcast hoặc kể chuyện trên YouTube.",
  
  COMPLETE_WRITING: "Viết đầy đủ từ đầu đến cuối mà không cần báo cáo lại tôi.",
  
  STORY_INIT_INFO: "Thông tin khởi tạo truyện như sau:",
  
  WRITING_REQUIREMENTS: {
    CHAPTER_STRUCTURE: "Mỗi chương nên có tiêu đề, mở đầu ấn tượng và kết thúc lắng đọng.",
    PLOT_WEAVING: "Tình tiết nên đan xen giữa thực – ảo – quá khứ – hiện tại.",
    CHARACTER_DEVELOPMENT: "Nhân vật phải có chuyển biến nội tâm sâu sắc, đặc biệt là nhân vật chính.",
    SPIRITUAL_DETAILS: "Mỗi chi tiết tâm linh (mộng, tượng, máu…) cần hợp lý và mang ý nghĩa tượng trưng cho nghiệp lực.",
    LANGUAGE_STYLE: "Ngôn ngữ thiên về văn học, trầm lặng, không cường điệu, giàu tính trinh thám.",
    TONE_MAINTENANCE: "Không cần mở rộng sang thể loại kinh dị, giữ tone bi – tĩnh – nhân quả – sám hối."
  },
  
  CHAPTER_TEMPLATE: {
    1: "Biến cố nơi cửa Phật - Tượng rỉ máu – cái chết trong chùa. Mở đầu vụ án. Không khí u ám. Một người chết, tượng gỗ rỉ máu. Khởi đầu nghi ngờ nghiệp báo.",
    2: "Người giữ nghiệp và điều tra viên - Điều tra viên đến, gặp nhân vật chính, bắt đầu đào sâu vụ việc. Cảm nhận luồng khí tâm linh bao trùm.",
    3: "Tượng linh – giấc mơ – vật chứng - Xuất hiện giấc mộng, tiếng gọi, vật chứng ẩn trong tượng. Mở đầu cho kết nối với nghiệp cũ.",
    4: "Lật lại ký ức tội lỗi - Quá khứ dần lộ rõ. Kẻ sát nhân hoặc nhân vật chính bắt đầu đối diện với tội lỗi xưa.",
    5: "Tự thú trong sám hối - Nhân vật thú nhận tội lỗi. Không xin tha thứ, chỉ xin được trả nghiệp. Cao trào cảm xúc – tâm linh.",
    6: "Bản án từ pháp luật và nhân quả - Tòa án kết tội. Trong trại giam, nhân vật bắt đầu hành trình sám hối, cải hóa. Mọi người xung quanh cũng chịu hậu quả tương ứng.",
    7: "Bài học cuối cùng – gieo nhân nào gặt quả đó - Truyện khép lại bằng bài học sâu sắc về nhân quả. Không ai thoát khỏi nghiệp mình gieo. Người đọc được mời chiêm nghiệm."
  },
  
  START_STORY: "Bắt đầu kể truyện. Chia theo chương rõ ràng."
};

export const SETTING_DESCRIPTIONS = {
  'chùa-cổ-trên-núi': 'Chùa cổ trên núi mù sương, tượng Di Lặc bằng gỗ trầm, rừng thiêng',
  'thiền-am-giữa-rừng-sương': 'Thiền am yên tĩnh giữa rừng sương mù, âm thanh thiên nhiên, không gian thiền định',
  'làng-nghề-đục-tượng-gỗ': 'Làng nghề truyền thống đục tượng gỗ, mùi gỗ trầm, tiếng đục đã, nghệ nhân già',
  'khu-mộ-am-thất-giếng-cổ': 'Khu mộ cổ, am thất hoang vắng, giếng nước cổ, không khí u ám'
};

export const KARMIC_THEME_DESCRIPTIONS = {
  'giết-nhầm-người-vô-tội': 'Nghiệp giết nhầm người vô tội, oan ức chưa được giải tỏa',
  'oan-sai-tráo-đổi-số-phận': 'Nghiệp từ việc gây oan sai, tráo đổi số phận người khác',
  'sát-sinh-lâu-dài-nghiệp-nghề': 'Nghiệp từ việc sát sinh lâu dài trong nghề nghiệp',
  'hại-người-thân-vì-ghen-ghét': 'Nghiệp từ việc hại người thân vì lòng ghen ghét, thù hận'
};

export const DISCOVERY_METHOD_DESCRIPTIONS = {
  'tượng-linh-rỉ-máu': 'Tượng Phật linh thiêng bỗng dưng rỉ máu, báo hiệu nghiệp lực hiện tại',
  'giấc-mộng-lặp-lại': 'Giấc mộng lặp đi lặp lại, linh hồn nạn nhân hiện về báo mộng',
  'vật-chứng-trong-tượng': 'Vật chứng bí ẩn được tìm thấy bên trong tượng hoặc tường chùa',
  'lời-kể-chú-tiểu': 'Lời kể trong sáng của chú tiểu hoặc đứa trẻ nhỏ có thể thấy được điều người lớn không thấy',
  'âm-thanh-giữa-đêm': 'Âm thanh kỳ lạ vang lên giữa đêm, tiếng kêu oan của linh hồn'
};