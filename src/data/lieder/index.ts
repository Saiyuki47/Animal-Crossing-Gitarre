import type { Lied } from '../songblatt'
import { BLUE_HAIR } from './blueHair'
import { GO_KK_RIDER } from './goKkRider'
import { KK_CRUISIN } from './kkCruisin'
import { LIED_505 } from './lied505'
import { ZOMBIE } from './zombie'

// Alle Lieder für „🎵 Das ganze Lied" – das erste ist die Standardauswahl.
export const LIEDER: Lied[] = [GO_KK_RIDER, KK_CRUISIN, ZOMBIE, BLUE_HAIR, LIED_505]

export const liedNach = (id: string | undefined) => LIEDER.find(l => l.id === id) ?? LIEDER[0]
