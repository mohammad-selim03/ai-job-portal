import { pipeline } from "@xenova/transformers";

// Load Named Entity Recognition (NER) model
const nlp = await pipeline("ner", "dslim/bert-base-NER", { grouped_entities: true });

export async function extractSkills(text: string): Promise<string[]> {
  try {
    const entities = await nlp(text);
    const skills = entities
      .filter((entity) => entity.entity_group === "MISC")
      .map((entity) => entity.word);
    
    return skills;
  } catch (error) {
    console.error("Error extracting skills:", error);
    return [];
  }
}
