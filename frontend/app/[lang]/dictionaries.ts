import "server-only";
import { EnumLang } from "@/enums";

const dictionaries: any = {
  [EnumLang.EN]: () => import(`./dictionaries/${EnumLang.EN}.json`).then((module) => module.default),
  [EnumLang.UK]: () => import(`./dictionaries/${EnumLang.UK}.json`).then((module) => module.default),
};

export const getDictionary = async (locale: EnumLang) => dictionaries[locale]();
