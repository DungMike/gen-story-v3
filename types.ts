export interface StoryFormData {
  topic: string;
  narrativeStyle: string;
  mainCharacterName: string;
  mainCharacterDesc: string;
  setting: string;
  settingDesc: string;
  chapters: Record<string, string>;
  wordCount: number;
}

export interface TemplateField {
  id: string;
  label: string;
  type: "select" | "text" | "textarea";
  options?: string[];
  placeholder?: string;
  chapter: number;
  description: string;
}

export interface StoryTemplate {
  id: string;
  name: string;
  description: string;
  gradient: string;
  chapters: Record<number, string>;
  fields: TemplateField[];
}

export interface ChapterContent {
  title: string;
  content: string;
}

// Buddhist Detective Story Form Data Interface
export interface BuddhistDetectiveFormData {
  genre: string;
  story_title: string;
  setting: string;
  custom_setting: string;
  main_character_name: string;
  main_character_dharma_name: string;
  main_character_past: string[];
  custom_main_character_past: string;
  victim_name: string;
  victim_role: string;
  custom_victim_role: string;
  investigator_name: string;
  investigator_traits: string[];
  custom_investigator_traits: string;
  karmic_theme: string;
  custom_karmic_theme: string;
  discovery_method: string;
  custom_discovery_method: string;
  philosophy_depth: number;
  custom_philosophy_depth: string;
  total_length: string;
  custom_total_length: string;
  chapter_count: number;
  chapter_length: number;
  custom_chapter_length: string;
  ending_type: string[];
  custom_ending_type: string;
  output_format: string;
  custom_output_format: string;
}