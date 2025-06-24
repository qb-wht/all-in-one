import {create} from 'zustand';

export interface AppSettingsState {
  isSource: boolean;
  changeIsSource: (value: boolean) => void;
  isLocal: boolean;
  changeIsLocal: (value: boolean) => void;
}

export const useAppSettingsStore = create<AppSettingsState>((set) => ({
  isSource: true,
  changeIsSource: (value) => set(() => ({isSource: value})),
  isLocal: false,
  changeIsLocal: (value) => set(() => ({isLocal: value})),
}));
