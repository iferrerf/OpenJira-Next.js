

import { formatDistanceToNow } from "date-fns";
import  {es} from "date-fns/locale";

export const getFormattedDistanceToNow = (date: number) => {

    const fromNow = formatDistanceToNow(date, {locale: es});

    return fromNow;
}