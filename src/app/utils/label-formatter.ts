import { IBatch } from "src/types/interfaces";

export class LabelFormatter {
    static formatBatchLabel(batch:IBatch): string {
      if(!batch)
        return "";
        
      return  `${batch.name} - ${batch.origin}`;
    }
  }