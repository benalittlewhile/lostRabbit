import { EmojiObject } from "react-twemoji-picker";

export interface BulletProps {
  id: number;
  icon: string;
  text: string;
}

export interface BottomBarProps {
  emojiData: Record<string, EmojiObject[]>;
  onNewBulletSubmit: (bullet: BulletProps) => void;
}

export interface BulletGroup {
  id: number;
  title: string;
  bullets: BulletProps[];
  // icon: string
}