import { StoryTemplate } from './types';
import i18n from './i18n';

// Function to get translated templates
export const getStoryTemplates = (): StoryTemplate[] => {
  const t = i18n.t;
  
  return [
    {
      id: "an-mang-tam-linh",
      name: t('templates.crimeSpiritual.name'),
      description: t('templates.crimeSpiritual.description'),
      gradient: "from-purple-500 to-indigo-600",
      chapters: {
        1: t('templates.crimeSpiritual.chapters.1'),
        2: t('templates.crimeSpiritual.chapters.2'),
        3: t('templates.crimeSpiritual.chapters.3'),
        4: t('templates.crimeSpiritual.chapters.4'),
        5: t('templates.crimeSpiritual.chapters.5'),
        6: t('templates.crimeSpiritual.chapters.6'),
      },
      fields: [
        // Chapter 1
        {
          id: "chuong1_boiduc_chinh",
          label: t('templates.crimeSpiritual.fields.chuong1_boiduc_chinh.label'),
          type: "select" as const,
          options: t('templates.crimeSpiritual.fields.chuong1_boiduc_chinh.options', { returnObjects: true }) as string[],
          chapter: 1,
          description: t('templates.crimeSpiritual.fields.chuong1_boiduc_chinh.description'),
        },
        {
          id: "chuong1_mota_boiduc",
          label: t('templates.crimeSpiritual.fields.chuong1_mota_boiduc.label'),
          type: "textarea" as const,
          placeholder: t('templates.crimeSpiritual.fields.chuong1_mota_boiduc.placeholder'),
          chapter: 1,
          description: t('templates.crimeSpiritual.fields.chuong1_mota_boiduc.description'),
        },
        {
          id: "chuong1_ten_nhanvat",
          label: t('templates.crimeSpiritual.fields.chuong1_ten_nhanvat.label'),
          type: "text" as const,
          placeholder: t('templates.crimeSpiritual.fields.chuong1_ten_nhanvat.placeholder'),
          chapter: 1,
          description: t('templates.crimeSpiritual.fields.chuong1_ten_nhanvat.description'),
        },
        {
          id: "chuong1_mota_nhanvat",
          label: t('templates.crimeSpiritual.fields.chuong1_mota_nhanvat.label'),
          type: "textarea" as const,
          placeholder: t('templates.crimeSpiritual.fields.chuong1_mota_nhanvat.placeholder'),
          chapter: 1,
          description: t('templates.crimeSpiritual.fields.chuong1_mota_nhanvat.description'),
        },
        {
          id: "chuong1_sukien_khoidau",
          label: t('templates.crimeSpiritual.fields.chuong1_sukien_khoidau.label'),
          type: "select" as const,
          options: t('templates.crimeSpiritual.fields.chuong1_sukien_khoidau.options', { returnObjects: true }) as string[],
          chapter: 1,
          description: t('templates.crimeSpiritual.fields.chuong1_sukien_khoidau.description'),
        },

        // Chapter 2
        {
          id: "chuong2_phathien_kyla",
          label: t('templates.crimeSpiritual.fields.chuong2_phathien_kyla.label'),
          type: "select" as const,
          options: t('templates.crimeSpiritual.fields.chuong2_phathien_kyla.options', { returnObjects: true }) as string[],
          chapter: 2,
          description: t('templates.crimeSpiritual.fields.chuong2_phathien_kyla.description'),
        },
        {
          id: "chuong2_nguoi_phathien",
          label: t('templates.crimeSpiritual.fields.chuong2_nguoi_phathien.label'),
          type: "select" as const,
          options: t('templates.crimeSpiritual.fields.chuong2_nguoi_phathien.options', { returnObjects: true }) as string[],
          chapter: 2,
          description: t('templates.crimeSpiritual.fields.chuong2_nguoi_phathien.description'),
        },
        {
          id: "chuong2_camxuc",
          label: t('templates.crimeSpiritual.fields.chuong2_camxuc.label'),
          type: "select" as const,
          options: t('templates.crimeSpiritual.fields.chuong2_camxuc.options', { returnObjects: true }) as string[],
          chapter: 2,
          description: t('templates.crimeSpiritual.fields.chuong2_camxuc.description'),
        },

        // Chapter 3
        {
          id: "chuong3_bimat_lichsu",
          label: t('templates.crimeSpiritual.fields.chuong3_bimat_lichsu.label'),
          type: "select" as const,
          options: t('templates.crimeSpiritual.fields.chuong3_bimat_lichsu.options', { returnObjects: true }) as string[],
          chapter: 3,
          description: t('templates.crimeSpiritual.fields.chuong3_bimat_lichsu.description'),
        },
        {
          id: "chuong3_nhanvat_quakhu",
          label: t('templates.crimeSpiritual.fields.chuong3_nhanvat_quakhu.label'),
          type: "select" as const,
          options: t('templates.crimeSpiritual.fields.chuong3_nhanvat_quakhu.options', { returnObjects: true }) as string[],
          chapter: 3,
          description: t('templates.crimeSpiritual.fields.chuong3_nhanvat_quakhu.description'),
        },
        {
          id: "chuong3_manh_moi",
          label: t('templates.crimeSpiritual.fields.chuong3_manh_moi.label'),
          type: "select" as const,
          options: t('templates.crimeSpiritual.fields.chuong3_manh_moi.options', { returnObjects: true }) as string[],
          chapter: 3,
          description: t('templates.crimeSpiritual.fields.chuong3_manh_moi.description'),
        },

        // Chapter 4
        {
          id: "chuong4_cai_chet",
          label: t('templates.crimeSpiritual.fields.chuong4_cai_chet.label'),
          type: "select" as const,
          options: t('templates.crimeSpiritual.fields.chuong4_cai_chet.options', { returnObjects: true }) as string[],
          chapter: 4,
          description: t('templates.crimeSpiritual.fields.chuong4_cai_chet.description'),
        },
        {
          id: "chuong4_nghi_ngo",
          label: t('templates.crimeSpiritual.fields.chuong4_nghi_ngo.label'),
          type: "select" as const,
          options: t('templates.crimeSpiritual.fields.chuong4_nghi_ngo.options', { returnObjects: true }) as string[],
          chapter: 4,
          description: t('templates.crimeSpiritual.fields.chuong4_nghi_ngo.description'),
        },
        {
          id: "chuong4_bimat_moi",
          label: t('templates.crimeSpiritual.fields.chuong4_bimat_moi.label'),
          type: "select" as const,
          options: t('templates.crimeSpiritual.fields.chuong4_bimat_moi.options', { returnObjects: true }) as string[],
          chapter: 4,
          description: t('templates.crimeSpiritual.fields.chuong4_bimat_moi.description'),
        },

        // Chapter 5
        {
          id: "chuong5_su_that",
          label: t('templates.crimeSpiritual.fields.chuong5_su_that.label'),
          type: "select" as const,
          options: t('templates.crimeSpiritual.fields.chuong5_su_that.options', { returnObjects: true }) as string[],
          chapter: 5,
          description: t('templates.crimeSpiritual.fields.chuong5_su_that.description'),
        },
        {
          id: "chuong5_ly_do_tra_thu",
          label: t('templates.crimeSpiritual.fields.chuong5_ly_do_tra_thu.label'),
          type: "select" as const,
          options: t('templates.crimeSpiritual.fields.chuong5_ly_do_tra_thu.options', { returnObjects: true }) as string[],
          chapter: 5,
          description: t('templates.crimeSpiritual.fields.chuong5_ly_do_tra_thu.description'),
        },

        // Chapter 6
        {
          id: "chuong6_twist_cuoi",
          label: t('templates.crimeSpiritual.fields.chuong6_twist_cuoi.label'),
          type: "select" as const,
          options: t('templates.crimeSpiritual.fields.chuong6_twist_cuoi.options', { returnObjects: true }) as string[],
          chapter: 6,
          description: t('templates.crimeSpiritual.fields.chuong6_twist_cuoi.description'),
        },
        {
          id: "chuong6_cau_hoi_mo",
          label: t('templates.crimeSpiritual.fields.chuong6_cau_hoi_mo.label'),
          type: "select" as const,
          options: t('templates.crimeSpiritual.fields.chuong6_cau_hoi_mo.options', { returnObjects: true }) as string[],
          chapter: 6,
          description: t('templates.crimeSpiritual.fields.chuong6_cau_hoi_mo.description'),
        }
      ],
    },
  ];
};

// Function to get translated style prompt
export const getStylePrompt = (): string => {
  return i18n.t('styles.prompt1');
}; 

// Function to get Buddhist-Detective story prompts
export const getBuddhistDetectivePrompts = () => {
  // Using constants directly since i18n doesn't support defaultValue
  return {
    masterNovelist: 'Bạn là một tiểu thuyết gia và nhà kể chuyện chuyên nghiệp, có kiến thức sâu sắc về tâm lý tội phạm, triết lý Phật giáo và nghệ thuật kể chuyện phá án nhân quả.',
    missionDescription: 'Dựa trên các thông số dưới đây, hãy viết ra một truyện hoàn chỉnh, đầy cảm xúc, logic, giàu chiều sâu, có bố cục mạch lạc, chia theo chương rõ ràng. Cốt truyện cần mang màu sắc phá án – trinh thám – nghiệp báo – sám hối.',
    writingStyle: 'Truyện nên sử dụng ngôn ngữ văn học chậm rãi, mang tính chiêm nghiệm, dễ dựng thành kịch bản podcast hoặc kể chuyện trên YouTube.',
    completeWriting: 'Viết đầy đủ từ đầu đến cuối mà không cần báo cáo lại tôi.',
    storyInitInfo: 'Thông tin khởi tạo truyện như sau:',
    startStory: 'Bắt đầu kể truyện. Chia theo chương rõ ràng.',
    requirements: {
      chapterStructure: 'Mỗi chương nên có tiêu đề, mở đầu ấn tượng và kết thúc lắng đọng.',
      plotWeaving: 'Tình tiết nên đan xen giữa thực – ảo – quá khứ – hiện tại.',
      characterDevelopment: 'Nhân vật phải có chuyển biến nội tâm sâu sắc, đặc biệt là nhân vật chính.',
      spiritualDetails: 'Mỗi chi tiết tâm linh (mộng, tượng, máu…) cần hợp lý và mang ý nghĩa tượng trưng cho nghiệp lực.',
      languageStyle: 'Ngôn ngữ thiên về văn học, trầm lặng, không cường điệu, giàu tính trinh thám.',
      toneMaintenance: 'Không cần mở rộng sang thể loại kinh dị, giữ tone bi – tĩnh – nhân quả – sám hối.'
    }
  };
}; 