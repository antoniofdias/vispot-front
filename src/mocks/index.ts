import { defaultMock } from './default';
import { emoMock } from './emo';
import { geekMock } from './geek';
import { hardcoreMock } from './hardcore';
import { punkMock } from './punk';
import { queerMock } from './queer';

export const mocks = {
  default: defaultMock,
  emo: emoMock,
  punk: punkMock,
  geek: geekMock,
  queer: queerMock,
  hardcore: hardcoreMock,
} as const;

export type MockKey = keyof typeof mocks;
