export type DataItem = {
  name: string;
  size: number;
  imports: string[];
};

export type EdgeBundlingProps = {
  width: number;
  height: number;
  data: DataItem[];
};

// Information needed to build the tooltip
// export type InteractionData = DataItem & {
//   xPos: number;
//   yPos: number;
// };
