<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-xxl">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default">Nom du personnage</span>
                    <input disabled :placeholder="characterName" type="text" class="form-control"
                        aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                </div>
            </div>
            <div class="col-xl">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default">Nom du joueur</span>
                    <input disabled :placeholder="store.getters['characterForm1/playerName']" type="text" class="form-control"
                        aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xxl-md">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default">Race</span>
                    <input disabled :placeholder="raceLabel" type="text" class="form-control"
                        aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                </div>
            </div>
            <div class="col-xxl-md">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default">Classe</span>
                    <input disabled :placeholder="classeLabel" type="text" class="form-control"
                        aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                </div>
            </div>
            
        </div>
        <div class="row">
            <div class="col-md">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default">Alignement</span>
                    <input disabled :placeholder="store.getters['characterForm1/alignment']" type="text" class="form-control"
                        aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                </div>
            </div>
            <div class="col-xl">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default">Histoire</span>
                    <input disabled :placeholder="props.characterName" type="text" class="form-control"
                        aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="card border-dark mb-3">
                    <div class="card-header">Caractéristiques</div>
                    <div class="card-body">
                        <div class="card-text">
                            <p>Force <span>{{ caracteristicsLabel[ENUM.CARACTERISTICS.FOR] }}</span></p>
                            <p>Dextérité <span>{{ caracteristicsLabel[ENUM.CARACTERISTICS.DEX]}}</span></p>
                            <p>Constitution <span>{{ caracteristicsLabel[ENUM.CARACTERISTICS.CON] }}</span></p>
                            <p>Intelligence <span>{{ caracteristicsLabel[ENUM.CARACTERISTICS.INT] }}</span></p>
                            <p>Sagesse <span>{{ caracteristicsLabel[ENUM.CARACTERISTICS.SAG]}}</span></p>
                            <p>Charisme <span>{{ caracteristicsLabel[ENUM.CARACTERISTICS.CHA] }}</span></p>
                        </div>
                    </div>
                </div>
                <div class="card border-dark mb-3">
                    <div class="card-header">Bonus</div>
                    <div class="card-body">
                        <div class="card-text">
                            <p>Maitrise <span>{{ attributs[ENUM.ATTRIBUTES_KEYS.BONUS_MAITRISE] }}</span></p>
                            <p>Perception passive <span> {{ passiveWisdom }} </span> </p>
                            <p class="text-secondary">Inspiration</p>
                        </div>
                    </div>
                </div>

                <div class="card border-dark mb-3">
                    <div class="card-header">Attributs</div>
                    <div class="card-body">
                        <div class="card-text">
                            <p>Classe d'armure <span>{{ attributs[ENUM.ATTRIBUTES_KEYS.CA] }} </span></p>
                            <p>Initiative <span>{{ inspiration }} </span></p>
                            <p>Vitesse <span>{{ attributs[ENUM.ATTRIBUTES_KEYS.SPEED] }} </span></p>
                            <p>Point de vie <span>{{ attributs[ENUM.ATTRIBUTES_KEYS.LIFE] }} </span></p>
                            <p class="text-secondary">Point de vie temporaire</p>
                            <p>Dé de vie <span>{{ attributs[ENUM.ATTRIBUTES_KEYS.LIFE_DICE] }} </span></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card border-dark mb-3">
                    <div class="card-header">Compétences</div>
                    <div class="card-body">
                        <div class="card-text">
                            <p :key="i" v-for="(s,k,i) in skillsDatas">{{s["name"]}} <span>{{ skillsLabel[k] }}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col">
                <ul class="list-group">
                <li class="list-group-item list-group-item-dark active">Equipements</li>
                <li class="list-group-item" v-for="(item, index) in items" :key="index">{{ item }}</li>
            </ul>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col">
                <ul class="list-group">
                <li class="list-group-item list-group-item-dark active">Sorts</li>
                <li class="list-group-item" v-for="(spell, index) in spells" :key="index">{{ spell }}</li>
            </ul>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col">
                <ul class="list-group">
                <li class="list-group-item list-group-item-dark active">Capacités</li>
                <li class="list-group-item" v-for="(capacity, index) in capacities" :key="index">{{ capacity }}</li>
            </ul>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col">
                <ul class="list-group">
                <li class="list-group-item list-group-item-dark active">Langues</li>
                <li class="list-group-item" v-for="(language, index) in languages" :key="index">{{ language }}</li>
            </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { useStore } from 'vuex'
import ENUM from '@/api/enum.js'
import skillsModule from '@/api/skills.js'

import { PROTOTYPE as PROTOTYPE_CLASS }  from '@/api/models/class'
import { PROTOTYPE as PROTOTYPE_RACE }  from '@/api/models/race'
import * as Utils  from '@/api/utils.js'

const props = defineProps(['competences'])

const store = useStore();
const characterName = computed(() => store.getters['characterForm1/characterName'])
const raceChoices = computed(() => store.getters['form2/raceState'])
const raceLabel = computed(
    () => {
        if (raceChoices.value.key === 'default')
            return ''

        console.log(raceChoices.value);

        const raceName = PROTOTYPE_RACE.find(c => c.key == raceChoices.value.key).name
        const thereIsSubRace = raceChoices.value.choices["subRace"].length > 0 && raceChoices.value.choices["subRace"][0].values.length > 0

        if (!thereIsSubRace)
            return raceName
        else {
            const subRaceName = raceChoices.value.choices["subRace"][0].values[0].name
            return `${raceName} (${subRaceName})`
        }   
    }
)

function computeAbilitiesModifier(value) {
    return Math.floor((value - 10) / 2)
}

const caracteristics = computed(() => store.getters['characterState/caracteristics'])
const caracteristicsLabel = computed(() => {
    let caracteristicsLabel = {}
    for (let key in caracteristics.value) {
        caracteristicsLabel[key] = caracteristics.value[key] + ' (' + computeAbilitiesModifier(caracteristics.value[key]) + ')'
    }
    return caracteristicsLabel;
})
const attributs = computed(() => store.getters['characterState/attributs'])

const skillsDatas = skillsModule.getSkills();

const skills = computed(() => store.getters['characterState/skills'])
const skillsLabel = computed(() => Utils.getSkillLabels(skills.value, caracteristics.value, attributs.value[ENUM.ATTRIBUTES_KEYS.BONUS_MAITRISE]))

const items = computed(() => store.getters['characterState/items'])
const spells = computed(() => store.getters['characterState/spells'])
const capacities = computed(() => store.getters['characterState/capacities'])
const classeChoices = computed(() => store.getters['form2/classState'])

const classeLabel = computed(
    () => {
        if (classeChoices.value.key === 'default')
            return ''

        const className = PROTOTYPE_CLASS.find(c => c.key == classeChoices.value.key).name
        const thereIsSubClass = classeChoices.value.choices["subClass"].length > 0

        if (!thereIsSubClass)
            return className
        else {
            const subClassName = classeChoices.value.choices["subClass"][0].name
            return `${className} ${subClassName}`
        }   
    }
)

const languages = computed(() => store.getters['characterState/languages'])

const passiveWisdom = computed(() => {
    return 10 //+ getSkillValueMaitrise(ENUM.SKILLS.PERCEPTION)
})

const inspiration = computed(() => {
    return computeAbilitiesModifier(caracteristics.value['dex'])
})

</script>