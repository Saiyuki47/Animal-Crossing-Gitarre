import type { Lied } from '../songblatt'
import { GO_KK_RIDER } from './goKkRider'
import { KK_CRUISIN } from './kkCruisin'

// Alle Lieder für „🎵 Das ganze Lied" – das erste ist die Standardauswahl.
export const LIEDER: Lied[] = [GO_KK_RIDER, KK_CRUISIN]

export const liedNach = (id: string | undefined) => LIEDER.find(l => l.id === id) ?? LIEDER[0]
