import json from '@/assets/newApi/subRaces.json'
import { SubRaces  } from '@/api/typeNew.js'

export const PROTOTYPE = SubRaces.fromJson(json)['elements'];