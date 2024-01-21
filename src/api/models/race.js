import json from '@/assets/newApi/races.json'
import { Races } from '@/api/typeNew.js'

export const PROTOTYPE = Races.fromJson(json)['elements'];