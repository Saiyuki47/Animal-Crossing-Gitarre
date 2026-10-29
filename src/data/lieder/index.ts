import type { Lied } from '../songblatt'
import { BLUE_HAIR } from './blueHair'
import { GO_KK_RIDER } from './goKkRider'
import { JUST_THE_TWO_OF_US } from './justTheTwoOfUs'
import { KK_CRUISIN } from './kkCruisin'
import { ZOMBIE } from './zombie'

// Alle Lieder für „🎵 Das ganze Lied" – das erste ist die Standardauswahl.
export const LIEDER: Lied[] = [GO_KK_RIDER, KK_CRUISIN, ZOMBIE, BLUE_HAIR, JUST_THE_TWO_OF_US]

export const liedNach = (id: string | undefined) => LIEDER.find(l => l.id === id) ?? LIEDER[0]
