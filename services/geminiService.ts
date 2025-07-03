import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { StoryFormData, StoryTemplate, BuddhistDetectiveFormData } from '../types';
import { getStylePrompt, getBuddhistDetectivePrompts } from '../i18nConstants';
import { BUDDHIST_DETECTIVE_PROMPTS, SETTING_DESCRIPTIONS, KARMIC_THEME_DESCRIPTIONS, DISCOVERY_METHOD_DESCRIPTIONS } from '../constant/index';
import i18n from '../i18n';
import { MODELS } from '@/constant/model-ai';

if (!process.env.GEMINI_API_KEY) {
  throw new Error("API_KEY environment variable not set");
}
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const modelName = MODELS.GEMINI_2_5_PRO;

// Helper function to build chapter structure from template fields
function buildChapterStructure(chapterNum: number, template: StoryTemplate, formData: StoryFormData): string {
  const t = i18n.t;
  const chapterFields = template.fields.filter(field => field.chapter === chapterNum);
  
  if (chapterFields.length === 0) {
    return t('prompts.storyGeneration.noSpecificDetails');
  }
  
  let structure = t('prompts.storyGeneration.detailsToFollow') + '\n';
  
  chapterFields.forEach(field => {
    const fieldValue = formData.chapters[field.id] || field.placeholder || t('prompts.storyGeneration.nothingHappened');
    structure += `\n- **${field.label}:** ${fieldValue}`;
    if (field.description) {
      structure += `\n  (${field.description})`;
    }
  });
  
  return structure;
}

export async function* generateStoryStream(formData: StoryFormData, template: StoryTemplate, selectedModel: string = MODELS.GEMINI_2_5_FLASH_001): AsyncGenerator<string, void, unknown> {
  const t = i18n.t;
  let previousChaptersSummary = t('prompts.storyGeneration.nothingHappened');
  const totalWords = formData.wordCount || 8000; // Fallback to 8000 words if not provided
  console.log("🚀 ~ function*generateStoryStream ~ wordCount:", formData.wordCount)
  
  const chapterNumbers = Object.keys(template.chapters).map(num => parseInt(num)).sort((a, b) => a - b);
  const wordsPerChapter = Math.floor(totalWords / chapterNumbers.length);

  for (const chapterNum of chapterNumbers) {
    const chapterTitle = template.chapters[chapterNum];
    const chapterStructure = buildChapterStructure(chapterNum, template, formData);
    
    // Yield chapter title as a markdown header before generating content
    
    const prompt = `
      ${t('prompts.storyGeneration.masterNovelist')}
      ${t('prompts.storyGeneration.missionDescription')}

      ${t('prompts.storyGeneration.storyOverview')}
      - ${t('prompts.storyGeneration.theme')} ${formData.topic}
      - ${t('prompts.storyGeneration.narrativeStyle')} ${getStylePrompt()}
      - ${t('prompts.storyGeneration.totalLength')} ${totalWords} words for the entire story.
      - ${t('prompts.storyGeneration.mainCharacter')} ${formData.mainCharacterName}, ${formData.mainCharacterDesc}.
      - ${t('prompts.storyGeneration.setting')} ${formData.setting}, ${formData.settingDesc}.
      - ${t('prompts.storyGeneration.onlyResult')}
      
      ${t('prompts.storyGeneration.previousChaptersSummary')}
      ${previousChaptersSummary}

      ${t('prompts.storyGeneration.currentChapterRequirements')} (${chapterTitle}):**
      
      ---
      ${chapterStructure}
      ---
      
      ${t('prompts.storyGeneration.beginWriting')} ${chapterTitle}:
    `;

    try {
        const stream = await ai.models.generateContentStream({
            model: selectedModel,
            contents: prompt,
            config: {
                // Disable thinking for lower latency on this creative task
                // thinkingConfig: { thinkingBudget: 0 } 
            }
        });

        let currentChapterContent = "";

        for await (const chunk of stream) {
            const chunkText = chunk.text;
            if (chunkText) {
                currentChapterContent += chunkText;
                yield chunkText;
            }
        }
        
        // After the chapter is fully generated, create a summary for the next iteration
        const summaryPrompt = `Summarize the following story chapter content in 20-30 concise sentences for use in writing the next chapter. Only provide the summary, don't add any introductory words:\n\n${currentChapterContent}`;
        
        const summaryResult: GenerateContentResponse = await ai.models.generateContent({
            model: selectedModel,
            contents: summaryPrompt
        });
        
        previousChaptersSummary += ` ${summaryResult.text}`;

    } catch (error) {
        console.error(`Error generating chapter ${chapterNum}:`, error);
        yield `\n\n${t('prompts.storyGeneration.errorGenerating')} ${chapterTitle}. ${t('prompts.storyGeneration.pleaseRetry')}\n\n`;
        // Stop generation if one chapter fails
        return;
    }
  }
}

// Simple test function for testing Gemini API
export async function testGeminiHelloWorld(): Promise<string> {
  try {
    const prompt = "Hello world! Please respond with a friendly greeting.";
    
    const result = await ai.models.generateContent({
      model: modelName,
      contents: prompt
    });
    
    return result.text || "No response received";
  } catch (error) {
    console.error("Error testing Gemini API:", error);
    throw error;
  }
}

// Helper function to get setting description
function getSettingDescription(setting: string, customSetting?: string): string {
  if (setting === 'custom' && customSetting) {
    return customSetting;
  }
  return SETTING_DESCRIPTIONS[setting as keyof typeof SETTING_DESCRIPTIONS] || setting;
}

// Helper function to get karmic theme description
function getKarmicThemeDescription(karmicTheme: string, customKarmicTheme?: string): string {
  if (karmicTheme === 'custom' && customKarmicTheme) {
    return customKarmicTheme;
  }
  return KARMIC_THEME_DESCRIPTIONS[karmicTheme as keyof typeof KARMIC_THEME_DESCRIPTIONS] || karmicTheme;
}

// Helper function to get discovery method description
function getDiscoveryMethodDescription(discoveryMethod: string): string {
  return DISCOVERY_METHOD_DESCRIPTIONS[discoveryMethod as keyof typeof DISCOVERY_METHOD_DESCRIPTIONS] || discoveryMethod;
}

// Helper function to calculate total words based on length setting
function getTotalWordsFromLength(totalLength: string, customTotalLength?: string): number {
  if (customTotalLength) {
    return parseInt(customTotalLength);
  }
  switch (totalLength) {
    case 'truyện-ngắn':
      return 10000;
    case 'truyện-vừa':
      return 15000;
    case 'truyện-dài':
      return 20000;
    case 'truyện-rất-dài':
      return 25000;
    default:
      return 18000;
  }
}

// Main function to generate Buddhist Detective Story
export async function* generateBuddhistDetectiveStory(
  formData: BuddhistDetectiveFormData, 
  selectedModel: string = MODELS.GEMINI_2_5_FLASH_001
): AsyncGenerator<string, void, unknown> {
  const prompts = getBuddhistDetectivePrompts();
  const totalWords = getTotalWordsFromLength(formData.total_length, formData?.custom_total_length);
  
  // Build story information from form data
  const settingDescription = getSettingDescription(formData.setting, formData.custom_setting);
  const karmicThemeDescription = getKarmicThemeDescription(formData.karmic_theme, formData.custom_karmic_theme);
  const discoveryMethodDescription = getDiscoveryMethodDescription(formData.discovery_method);
  
  // Build character descriptions
  const mainCharacterPast = formData.main_character_past.join(', ');
  const investigatorTraits = formData.investigator_traits.join(', ');
  const endingTypes = formData.ending_type.join(', ');
  
  // Create the comprehensive prompt
  const mainPrompt = `
${prompts.masterNovelist}

${prompts.missionDescription}

${prompts.writingStyle}

${prompts.completeWriting}

${prompts.storyInitInfo}

Thể loại chính: ${formData.genre}
Tên truyện: ${formData.story_title || 'Chưa đặt tên'}
Bối cảnh chính: ${settingDescription}

Nhân vật chính: ${formData.main_character_name} (pháp danh: ${formData.main_character_dharma_name})
- Quá khứ: ${mainCharacterPast}

Nhân vật phụ:
- Nạn nhân: ${formData.victim_name} (${formData.victim_role})
- Điều tra viên: ${formData.investigator_name} (${investigatorTraits})

Loại nghiệp: ${karmicThemeDescription}
Cách phá án: ${discoveryMethodDescription}
Kết thúc mong muốn: ${endingTypes}

Độ sâu triết lý: ${formData.philosophy_depth}/5 (${formData.philosophy_depth >= 4 ? 'rất sâu, có pháp thoại, Phật lý, nhân quả rõ nét' : 'vừa phải'})
Tổng độ dài: ~${totalWords} từ
Số chương: ${formData.chapter_count} chương


Cấu trúc chương:
${Object.entries(BUDDHIST_DETECTIVE_PROMPTS.CHAPTER_TEMPLATE).map(([num, desc]) => 
  `• Chương ${num}: ${desc}`
).join('\n')}

Yêu cầu:
- ${prompts.requirements.chapterStructure}
- ${prompts.requirements.plotWeaving}
- ${prompts.requirements.characterDevelopment}
- ${prompts.requirements.spiritualDetails}
- ${prompts.requirements.languageStyle}
- ${prompts.requirements.toneMaintenance}
- ${prompts.requirements.importantNote}

${prompts.startStory}
  `;

  try {
    const stream = await ai.models.generateContentStream({
      model: selectedModel,
      contents: mainPrompt,
      config: {
        // Configure for creative writing
      }
    });

    for await (const chunk of stream) {
      const chunkText = chunk.text;
      if (chunkText) {
        yield chunkText;
      }
    }

  } catch (error) {
    console.error('Error generating Buddhist Detective story:', error);
    yield `\n\nLỗi khi tạo truyện: ${error}. Vui lòng thử lại.\n\n`;
    return;
  }
}