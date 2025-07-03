'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/providers/I18nProvider';
import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';
import { generateBuddhistDetectiveStory } from '@/services/geminiService';
import { BuddhistDetectiveFormData } from '@/types';
import { saveStoryToLocalStorage, getStoriesFromLocalStorage } from '@/services/ttsService';
import { v4 as uuidv4 } from 'uuid';

interface StoryFormData {
  genre: string;
  story_title: string;
  setting: string;
  custom_setting: string;
  main_character_name: string;
  main_character_dharma_name: string;
  main_character_past: string[];
  victim_name: string;
  victim_role: string;
  investigator_name: string;
  investigator_traits: string[];
  karmic_theme: string;
  custom_karmic_theme: string;
  discovery_method: string;
  philosophy_depth: number;
  total_length: string;
  chapter_count: number;
  chapter_length: number;
  ending_type: string[];
  output_format: string;
}

interface ChapterHighlight {
  chapter: number;
  title: string;
  content: string;
}

const ImageGeneratorPage2: React.FC = () => {
  const { t } = useI18n();
  const router = useRouter();

  const [formData, setFormData] = useState<StoryFormData>({
    genre: 'Phá án – nghiệp báo – tâm linh (kết thúc bằng bản án và bài học)',
    story_title: '',
    setting: 'chùa-cổ-trên-núi',
    custom_setting: '',
    main_character_name: 'Nguyễn Hữu Duy',
    main_character_dharma_name: 'Tâm Minh',
    main_character_past: ['từng-giết-người-vô-tội'],
    victim_name: 'Sư cô Như Lành',
    victim_role: 'tu-sĩ',
    investigator_name: 'Thượng úy Lê Thụ',
    investigator_traits: ['ít-nói-từng-có-căn-tu'],
    karmic_theme: 'giết-nhầm-người-vô-tội',
    custom_karmic_theme: '',
    discovery_method: 'tượng-linh-rỉ-máu',
    philosophy_depth: 5,
    total_length: 'truyện-vừa',
    chapter_count: 7,
    chapter_length: 1500,
    ending_type: ['bản-án-rõ-ràng', 'thức-tỉnh-cải-tạo', 'bài-học-nhân-quả'],
    output_format: 'kịch-bản-kể-chuyện'
  });

  // Add new state for story generation
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStory, setGeneratedStory] = useState('');
  const [showStory, setShowStory] = useState(false);
  const [savedStoryInfo, setSavedStoryInfo] = useState<{id: string, title: string} | null>(null);
  const [retryAttempt, setRetryAttempt] = useState(0);
  const [retryError, setRetryError] = useState<string | null>(null);

  // Helper function to generate default story title with incrementing number
  const generateDefaultStoryTitle = (): string => {
    const existingStories = getStoriesFromLocalStorage();
    const defaultTitleStories = existingStories.filter(story => 
      story.title?.startsWith('Truyện chưa đặt tên')
    );
    const nextNumber = defaultTitleStories.length + 1;
    return `Truyện chưa đặt tên ${nextNumber}`;
  };

  // Custom save function for Buddhist Detective stories with proper title handling
  const saveBuddhistDetectiveStory = (storyContent: string, customTitle?: string): string => {
    try {
      const existingStories = getStoriesFromLocalStorage();
      const storyId = uuidv4();
      const timestamp = new Date().toISOString();
      
      // Use custom title if provided and not empty, otherwise generate default title
      const finalTitle = customTitle?.trim() || generateDefaultStoryTitle();
      
      const storyData = {
        content: storyContent,
        timestamp,
        id: storyId,
        title: finalTitle,
        templateName: 'Buddhist Detective'
      };
      
      const updatedStories = [storyData, ...existingStories];
      localStorage.setItem('generated_stories', JSON.stringify(updatedStories));
      
      return storyId;
    } catch (error) {
      console.error('Error saving Buddhist Detective story:', error);
      return '';
    }
  };

  const [chapterHighlights] = useState<ChapterHighlight[]>([
    { 
      chapter: 1, 
      title: 'Cái chết trong chùa', 
      content: 'Mở đầu bằng một vụ chết người kỳ lạ tại chùa. Xuất hiện hiện tượng linh dị (tượng rỉ máu, âm thanh lạ...). Tạo không khí u ám, gieo mầm cho vụ án và nghiệp lực sắp được hé mở.' 
    },
    { 
      chapter: 2, 
      title: 'Người giữ nghiệp và điều tra viên', 
      content: 'Nhân vật điều tra xuất hiện và bắt đầu tìm hiểu sự thật. Gặp nhân vật chính – người có quá khứ bất ổn hoặc nghiệp sát. Bối cảnh chùa dần hé lộ những tầng nghĩa tâm linh.' 
    },
    { 
      chapter: 3, 
      title: 'Tượng linh – giấc mơ – vật chứng', 
      content: 'Các manh mối phi vật lý bắt đầu lộ diện: mộng báo, hiện tượng tâm linh, vật chứng bí ẩn (thư, xâu chuỗi...). Yếu tố siêu hình kết nối với tội nghiệp xưa.' 
    },
    { 
      chapter: 4, 
      title: 'Lật lại ký ức tội lỗi', 
      content: 'Quá khứ của nhân vật chính (hoặc hung thủ) được đào sâu. Hành vi sai trái trong quá khứ trồi lên. Nội tâm giằng xé, cảm giác nghiệp lực đeo bám nặng nề.' 
    },
    { 
      chapter: 5, 
      title: 'Tự thú trong sám hối', 
      content: 'Sự thật được phơi bày. Nhân vật chính hoặc hung thủ thú nhận tội lỗi. Có sự thức tỉnh về tâm linh – không xin tha thứ, mà mong trả nghiệp.' 
    },
    { 
      chapter: 6, 
      title: 'Bản án từ pháp luật và nhân quả', 
      content: 'Tội lỗi được pháp luật xét xử. Nhưng bản án không dừng ở pháp luật – mà mở ra quá trình cải hóa tâm linh. Nhân vật nhận trách nhiệm và chấp nhận quả báo.' 
    },
    { 
      chapter: 7, 
      title: 'Bài học cuối cùng – gieo nhân nào gặt quả đó', 
      content: 'Truyện khép lại bằng một thông điệp nhân quả rõ ràng. Nhấn mạnh rằng nghiệp không mất, chỉ chuyển. Gieo nhân gì gặt quả ấy. Mở lối cho người đọc chiêm nghiệm và thức tỉnh.' 
    },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => {
        const currentArray = prev[name as keyof StoryFormData] as string[];
        if (checkbox.checked) {
          return { ...prev, [name]: [...currentArray, value] };
        } else {
          return { ...prev, [name]: currentArray.filter(item => item !== value) };
        }
      });
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Function to generate story with retry logic
  const generateStoryWithRetry = async (buddhistFormData: BuddhistDetectiveFormData, attempt: number = 1): Promise<string> => {
    const maxAttempts = 3;
    setRetryAttempt(attempt);
    setRetryError(null);

    try {
      console.log(`Attempt ${attempt}/${maxAttempts}: Generating Buddhist Detective story...`);
      
      // Generate story using streaming
      const generator = generateBuddhistDetectiveStory(buddhistFormData);
      let fullStoryContent = '';
      
      for await (const chunk of generator) {
        fullStoryContent += chunk;
        setGeneratedStory(prev => prev + chunk);
      }

      if (!fullStoryContent.trim()) {
        throw new Error('Không nhận được nội dung truyện từ API');
      }

      console.log(`✅ Attempt ${attempt} thành công`);
      setRetryAttempt(0); // Reset retry counter on success
      return fullStoryContent;

    } catch (error) {
      console.error(`❌ Attempt ${attempt} failed:`, error);
      const errorMessage = error instanceof Error ? error.message : 'Lỗi không xác định';
      
      if (attempt < maxAttempts) {
        setRetryError(`Lỗi attempt ${attempt}: ${errorMessage}. Đang thử lại...`);
        console.log(`🔄 Retrying... (${attempt + 1}/${maxAttempts})`);
        
        // Wait a bit before retry (exponential backoff)
        const delayMs = Math.pow(2, attempt - 1) * 1000; // 1s, 2s, 4s
        await new Promise(resolve => setTimeout(resolve, delayMs));
        
        // Clear previous story content before retry
        setGeneratedStory('');
        
        // Recursive retry
        return generateStoryWithRetry(buddhistFormData, attempt + 1);
      } else {
        // All attempts failed
        setRetryError(`Đã thử ${maxAttempts} lần nhưng vẫn gặp lỗi: ${errorMessage}`);
        throw new Error(`Không thể tạo truyện sau ${maxAttempts} lần thử. Lỗi cuối: ${errorMessage}`);
      }
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    try {
      setIsGenerating(true);
      setGeneratedStory('');
      setShowStory(true);
      setSavedStoryInfo(null); // Clear previous save notification
      setRetryAttempt(0);
      setRetryError(null);
      
      // Convert form data to Buddhist detective format
      const buddhistFormData: BuddhistDetectiveFormData = {
        genre: formData.genre,
        story_title: formData.story_title,
        setting: formData.setting,
        custom_setting: formData.custom_setting,
        main_character_name: formData.main_character_name,
        main_character_dharma_name: formData.main_character_dharma_name,
        main_character_past: formData.main_character_past,
        victim_name: formData.victim_name,
        victim_role: formData.victim_role,
        investigator_name: formData.investigator_name,
        investigator_traits: formData.investigator_traits,
        karmic_theme: formData.karmic_theme,
        custom_karmic_theme: formData.custom_karmic_theme,
        discovery_method: formData.discovery_method,
        philosophy_depth: formData.philosophy_depth,
        total_length: formData.total_length,
        chapter_count: formData.chapter_count,
        chapter_length: formData.chapter_length,
        ending_type: formData.ending_type,
        output_format: formData.output_format
      };

      console.log('Starting story generation with retry mechanism...', buddhistFormData);

      // Generate story with retry logic
      const fullStoryContent = await generateStoryWithRetry(buddhistFormData);
      
      // Save story to localStorage after generation completes
      if (fullStoryContent.trim()) {
        const finalTitle = formData.story_title.trim() || generateDefaultStoryTitle();
        const storyId = saveBuddhistDetectiveStory(fullStoryContent, formData.story_title);
        console.log(`Truyện đã được lưu với ID: ${storyId} và tên: "${finalTitle}"`);
        setSavedStoryInfo({id: storyId, title: finalTitle});
      }
      
    } catch (error) {
      console.error('Final error after all retries:', error);
      const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi tạo truyện';
      setGeneratedStory(`❌ ${errorMessage}\n\nVui lòng thử lại sau hoặc kiểm tra kết nối mạng.`);
    } finally {
      setIsGenerating(false);
      setRetryAttempt(0);
    }
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-400">
            CÁC LỰA CHỌN KHỞI TẠO TRUYỆN (CHO TOOL)
          </h1>
          <button
            onClick={handleBackToHome}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            ← Quay lại
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 1. Thể loại */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <label className="block text-lg font-semibold mb-3">
              🔹 1. Thể loại (genre)
            </label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              readOnly
            />
          </div>

          {/* 2. Tên truyện */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <label className="block text-lg font-semibold mb-3">
              📌 2. Tên truyện (story_title)
            </label>
            <input
              type="text"
              name="story_title"
              value={formData.story_title}
              onChange={handleInputChange}
              placeholder="Nhập tùy ý (gợi ý: mang màu sắc thiền, tượng, nghiệp, nhân quả…)"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
            />
          </div>

          {/* 3. Bối cảnh chính */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <label className="block text-lg font-semibold mb-3">
              3. Bối cảnh chính (setting)
            </label>
            <div className="space-y-3">
              {[
                { value: 'chùa-cổ-trên-núi', label: '⛰️ Chùa cổ trên núi' },
                { value: 'thiền-am-giữa-rừng-sương', label: '🌫️ Thiền am giữa rừng sương' },
                { value: 'làng-nghề-đục-tượng-gỗ', label: '🪵 Làng nghề đục tượng gỗ' },
                { value: 'khu-mộ-am-thất-giếng-cổ', label: '🔥 Khu mộ, am thất, giếng cổ' }
              ].map(option => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="setting"
                    value={option.value}
                    checked={formData.setting === option.value}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  {option.label}
                </label>
              ))}
              <label className="flex items-center">
                <input
                  type="radio"
                  name="setting"
                  value="custom"
                  checked={formData.setting === 'custom'}
                  onChange={handleInputChange}
                  className="mr-3"
                />
                ✍️ Nhập tùy chỉnh
              </label>
              {formData.setting === 'custom' && (
                <input
                  type="text"
                  name="custom_setting"
                  value={formData.custom_setting}
                  onChange={handleInputChange}
                  placeholder="Nhập bối cảnh tùy chỉnh"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 mt-2"
                />
              )}
            </div>
          </div>

          {/* 4. Nhân vật chính */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <label className="block text-lg font-semibold mb-3">
              👤 4. Nhân vật chính (main_character)
            </label>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Họ tên:</label>
                <input
                  type="text"
                  name="main_character_name"
                  value={formData.main_character_name}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">🧘‍♂️ Pháp danh:</label>
                <input
                  type="text"
                  name="main_character_dharma_name"
                  value={formData.main_character_dharma_name}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">📜 Quá khứ:</label>
                <div className="space-y-2">
                  {[
                    { value: 'từng-giết-người-vô-tội', label: 'Từng giết người vô tội' },
                    { value: 'làm-nghề-sát-sinh', label: 'Làm nghề sát sinh (đục tượng gỗ trầm, giết mổ...)' },
                    { value: 'gieo-nghiệp-vì-thù-hận', label: 'Gieo nghiệp vì thù hận / vô tình' },
                    { value: 'đã-từng-có-căn-tu', label: 'Đã từng có căn tu, giờ sống ẩn tại chùa' }
                  ].map(option => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="checkbox"
                        name="main_character_past"
                        value={option.value}
                        checked={formData.main_character_past.includes(option.value)}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 5. Nạn nhân */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <label className="block text-lg font-semibold mb-3">
              👩‍🦰 5. Nạn nhân (victim)
            </label>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Tên:</label>
                <input
                  type="text"
                  name="victim_name"
                  value={formData.victim_name}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Vai trò:</label>
                <select
                  name="victim_role"
                  value={formData.victim_role}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                >
                  <option value="tu-sĩ">Tu sĩ</option>
                  <option value="người-dân-lành">Người dân lành</option>
                  <option value="nhân-chứng-tội-lỗi">Nhân chứng của tội lỗi quá khứ</option>
                </select>
              </div>
            </div>
          </div>

          {/* 6. Nhân vật điều tra */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <label className="block text-lg font-semibold mb-3">
              👮‍♂️ 6. Nhân vật điều tra (investigator)
            </label>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Tên:</label>
                <input
                  type="text"
                  name="investigator_name"
                  value={formData.investigator_name}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Đặc điểm:</label>
                <div className="space-y-2">
                  {[
                    { value: 'ít-nói-từng-có-căn-tu', label: 'Ít nói, từng có căn tu' },
                    { value: 'tin-vào-nghiệp-báo', label: 'Tin vào nghiệp báo' },
                    { value: 'từng-cứu-người-bỏ-ngành', label: 'Từng cứu người rồi bỏ ngành một thời gian' }
                  ].map(option => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="checkbox"
                        name="investigator_traits"
                        value={option.value}
                        checked={formData.investigator_traits.includes(option.value)}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 7. Loại nghiệp chính */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <label className="block text-lg font-semibold mb-3">
              7. Loại nghiệp chính (karmic_theme)
            </label>
            <div className="space-y-3">
              {[
                { value: 'giết-nhầm-người-vô-tội', label: '🔪 Giết nhầm người vô tội' },
                { value: 'oan-sai-tráo-đổi-số-phận', label: '🧱 Oan sai – tráo đổi số phận' },
                { value: 'sát-sinh-lâu-dài-nghiệp-nghề', label: '🐂 Sát sinh lâu dài – nghiệp nghề' },
                { value: 'hại-người-thân-vì-ghen-ghét', label: '🧑‍🍼 Hại người thân vì ghen ghét' }
              ].map(option => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="karmic_theme"
                    value={option.value}
                    checked={formData.karmic_theme === option.value}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  {option.label}
                </label>
              ))}
              <label className="flex items-center">
                <input
                  type="radio"
                  name="karmic_theme"
                  value="custom"
                  checked={formData.karmic_theme === 'custom'}
                  onChange={handleInputChange}
                  className="mr-3"
                />
                ✍️ Nhập tùy chỉnh
              </label>
              {formData.karmic_theme === 'custom' && (
                <input
                  type="text"
                  name="custom_karmic_theme"
                  value={formData.custom_karmic_theme}
                  onChange={handleInputChange}
                  placeholder="Nhập loại nghiệp tùy chỉnh"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 mt-2"
                />
              )}
            </div>
          </div>

          {/* 8. Phương thức hé lộ sự thật */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <label className="block text-lg font-semibold mb-3">
              8. Phương thức hé lộ sự thật (discovery_method)
            </label>
            <div className="space-y-3">
              {[
                { value: 'tượng-linh-rỉ-máu', label: '🧿 Tượng linh rỉ máu' },
                { value: 'giấc-mộng-lặp-lại', label: '💭 Giấc mộng lặp đi lặp lại' },
                { value: 'vật-chứng-trong-tượng', label: '📜 Vật chứng trong tượng / tường' },
                { value: 'lời-kể-chú-tiểu', label: '🧒 Lời kể chú tiểu / đứa trẻ' },
                { value: 'âm-thanh-giữa-đêm', label: '🔊 Âm thanh giữa đêm' }
              ].map(option => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="discovery_method"
                    value={option.value}
                    checked={formData.discovery_method === option.value}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          {/* 9. Độ sâu triết lý */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <label className="block text-lg font-semibold mb-3">
              9. Độ sâu triết lý (philosophy_depth)
            </label>
            <div className="space-y-3">
              {[
                { value: 1, label: '1 – Nhẹ (nghệ thuật kể chuyện)' },
                { value: 3, label: '3 – Vừa (có nhân quả, luân hồi)' },
                { value: 5, label: '✅ 5 – Sâu (Phật pháp, nghiệp lực, sám hối, lời răn)' }
              ].map(option => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="philosophy_depth"
                    value={option.value}
                    checked={formData.philosophy_depth === option.value}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          {/* 10. Độ dài truyện */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <label className="block text-lg font-semibold mb-3">
              10. Độ dài truyện (total_length)
            </label>
            <div className="space-y-3">
              {[
                { value: 'truyện-ngắn', label: 'Truyện ngắn (~5.000 từ)' },
                { value: 'truyện-vừa', label: '✅ Truyện vừa (~10.000 từ)' },
                { value: 'truyện-dài', label: 'Truyện dài (15.000–20.000 từ)' }
              ].map(option => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="total_length"
                    value={option.value}
                    checked={formData.total_length === option.value}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          {/* 11. Số chương */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <label className="block text-lg font-semibold mb-3">
              11. Số chương (chapter_count)
            </label>
            <input
              type="number"
              name="chapter_count"
              value={formData.chapter_count}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              readOnly
            />
            <p className="text-sm text-gray-400 mt-2">✅ 7 chương (cố định theo template A1-R)</p>
          </div>

          {/* 12. Độ dài mỗi chương */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <label className="block text-lg font-semibold mb-3">
              12. Độ dài mỗi chương (chapter_length)
            </label>
            <div className="space-y-3">
              {[
                { value: 1000, label: '1000 từ' },
                { value: 1500, label: '✅ 1500 từ' },
                { value: 2000, label: '2000 từ' }
              ].map(option => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="chapter_length"
                    value={option.value}
                    checked={formData.chapter_length === option.value}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          {/* 13. Cái kết mong muốn */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <label className="block text-lg font-semibold mb-3">
              13. Cái kết mong muốn (ending_type)
            </label>
            <div className="space-y-2">
              {[
                { value: 'bản-án-rõ-ràng', label: '✅ Bản án rõ ràng cho kẻ xấu' },
                { value: 'thức-tỉnh-cải-tạo', label: '✅ Thức tỉnh và cải tạo trong tù' },
                { value: 'bài-học-nhân-quả', label: '✅ Bài học nhân quả sâu sắc gửi đến khán giả' }
              ].map(option => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    name="ending_type"
                    value={option.value}
                    checked={formData.ending_type.includes(option.value)}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          {/* 14. Định dạng đầu ra */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <label className="block text-lg font-semibold mb-3">
              14. Định dạng đầu ra (output_format)
            </label>
            <div className="space-y-3">
              {[
                { value: 'file-văn-bản', label: 'File văn bản (PDF / DOCX)' },
                { value: 'html-web', label: 'HTML để đăng web' },
                { value: 'kịch-bản-kể-chuyện', label: '✅ Kịch bản kể chuyện (Podcast, YouTube)' },
                { value: 'json', label: 'JSON (gồm tiêu đề, mô tả từng chương)' }
              ].map(option => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="output_format"
                    value={option.value}
                    checked={formData.output_format === option.value}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          {/* 15. Nội dung điểm nhấn theo từng chương */}
          {/* <div className="bg-gray-800 p-6 rounded-lg">
            <label className="block text-lg font-semibold mb-3">
              15. Nội dung điểm nhấn theo từng chương (chapter_highlights)
            </label>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left p-3 font-semibold">Chương</th>
                    <th className="text-left p-3 font-semibold">Tiêu đề</th>
                    <th className="text-left p-3 font-semibold">Nội dung điểm nhấn (chung, khái quát)</th>
                  </tr>
                </thead>
                <tbody>
                  {chapterHighlights.map((chapter) => (
                    <tr key={chapter.chapter} className="border-b border-gray-700">
                      <td className="p-3 font-medium">{chapter.chapter}</td>
                      <td className="p-3 font-medium">{chapter.title}</td>
                      <td className="p-3 text-gray-300">{chapter.content}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div> */}

          {/* Submit Button */}
          <div className="flex justify-center space-x-4 pt-8">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Tạo truyện
            </button>
            <button
              type="button"
              onClick={() => setFormData({
                genre: 'Phá án – nghiệp báo – tâm linh (kết thúc bằng bản án và bài học)',
                story_title: '',
                setting: 'chùa-cổ-trên-núi',
                custom_setting: '',
                main_character_name: 'Nguyễn Hữu Duy',
                main_character_dharma_name: 'Tâm Minh',
                main_character_past: ['từng-giết-người-vô-tội'],
                victim_name: 'Sư cô Như Lành',
                victim_role: 'tu-sĩ',
                investigator_name: 'Thượng úy Lê Thụ',
                investigator_traits: ['ít-nói-từng-có-căn-tu'],
                karmic_theme: 'giết-nhầm-người-vô-tội',
                custom_karmic_theme: '',
                discovery_method: 'tượng-linh-rỉ-máu',
                philosophy_depth: 5,
                total_length: 'truyện-vừa',
                chapter_count: 7,
                chapter_length: 1500,
                ending_type: ['bản-án-rõ-ràng', 'thức-tỉnh-cải-tạo', 'bài-học-nhân-quả'],
                output_format: 'kịch-bản-kể-chuyện'
              })}
              className="px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
            >
              Reset Form
            </button>
          </div>
        </form>

        {/* Story Generation Result */}
        {showStory && (
          <div className="mt-8 bg-gray-800 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-blue-400">Truyện được tạo</h2>
              {isGenerating && (
                <div className="flex items-center">
                  <LoadingSpinner />
                  <div className="ml-2">
                    <span className="text-gray-300">Đang tạo truyện...</span>
                    {retryAttempt > 0 && (
                      <div className="text-yellow-400 text-sm mt-1">
                        🔄 Lần thử: {retryAttempt}/3
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Retry Error Information */}
            {retryError && (
              <div className="mb-4 p-3 bg-yellow-800 border border-yellow-600 rounded-lg">
                <div className="flex items-center">
                  <div className="text-yellow-400 mr-2">⚠️</div>
                  <div className="text-yellow-100 text-sm">{retryError}</div>
                </div>
              </div>
            )}
            
            <div className="bg-gray-700 p-4 rounded-lg max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-gray-100 leading-relaxed">
                {generatedStory || (isGenerating ? (
                  retryAttempt > 0 ? 
                    `Đang thử lại lần ${retryAttempt}/3...\nVui lòng chờ trong giây lát.` : 
                    'Đang khởi tạo...'
                ) : 'Chưa có nội dung')}
              </pre>
            </div>
            
            {!isGenerating && generatedStory && (
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => navigator.clipboard.writeText(generatedStory)}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  📋 Copy truyện
                </button>
                <button
                  onClick={() => {
                    const blob = new Blob([generatedStory], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${formData.story_title || 'truyen-buddhist-detective'}.txt`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  💾 Tải xuống
                </button>
                <button
                  onClick={() => {
                    setShowStory(false);
                    setGeneratedStory('');
                  }}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  ✖️ Đóng
                </button>
              </div>
            )}

            {/* Manual Retry Button - Show when there's an error and not currently generating */}
            {!isGenerating && generatedStory.includes('❌') && (
              <div className="mt-4 flex justify-center">
                <button
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center"
                >
                  🔄 Thử lại tạo truyện
                </button>
              </div>
            )}

            {/* Save Success Notification */}
            {savedStoryInfo && (
              <div className="mt-4 p-4 bg-green-800 border border-green-600 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-green-400 mr-3">✅</div>
                    <div>
                      <p className="text-green-100 font-medium">Truyện đã được lưu thành công!</p>
                      <p className="text-green-300 text-sm">Tên: "{savedStoryInfo.title}"</p>
                      <p className="text-green-300 text-sm">ID: {savedStoryInfo.id}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => router.push('/dashboard')}
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors"
                    >
                      📚 Xem Dashboard
                    </button>
                    <button
                      onClick={() => setSavedStoryInfo(null)}
                      className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded transition-colors"
                    >
                      ✖️
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default ImageGeneratorPage2;
