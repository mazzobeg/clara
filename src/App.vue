<template>
  <nav class="navbar" style="height: 50px; background-color: #3D5235;">
  </nav>

  <img class="mx-auto d-block" src="@/assets/header.png" alt="" srcset="" width="100" style="position: relative; bottom: 40px;">

  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <div class="progress mb-3" role="progressbar" aria-label="Example 20px high" :aria-valuenow="step / 3 * 100"
          aria-valuemin="0" aria-valuemax="100" style="height: 20px">
          <div class="progress-bar" :style="`width: ${step / 3 * 100}%`"></div>
        </div>
        <CharacterForm1 v-if="step === 0" @update:character-name="name => display(name)" @next="step++" />
        <CharacterForm2 v-if="step === 1" @update:race="race => displayRace(race)" @next="step++" @previous="step--"
          @update:classe="classe => displayClasse(classe)" />
        <CharacterForm3 v-if="step === 2" @next="step++" @previous="step--" />
        <CharacterForm4 v-if="step === 3" @next="step++" @previous="step--" />
      </div>
      <div class="col-md-6 ps-md-5 mt-5 mt-md-0">
        <div class="bg-light border border-dark rounded" >
          <CharacterFile :character-name="characterName" :race="race" :caracteristiques="caracteristiques"
            :competences="competences" :equipements="equipements" :bonus_maitrise="bonus_maitrise" />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import CharacterForm1 from './components/CharacterForm1.vue';

import { ref } from 'vue'
import CharacterFile from './components/CharacterFile.vue'
import CharacterForm2 from './components/CharacterForm2.vue';
import CharacterForm3 from './components/CharacterForm3.vue';
import CharacterForm4 from './components/CharacterForm4.vue';
import data_races from '@/assets/race_lvl1.json'

const caracteristiques = ref({
  "force": 0,
  "dexterite": 0,
  "constitution": 0,
  "intelligence": 0,
  "sagesse": 0,
  "charisme": 0
})

const equipements = ref([])
const competences = ref({
  "Acrobaties": 0,
  "Arnaque": 0,
  "Athlétisme": 0,
  "Discrétion": 0,
  "Dressage": 0,
  "Escamotage": 0,
  "Histoire": 0,
  "Intimidation": 0,
  "Investigation": 0,
  "Médecine": 0,
  "Nature": 0,
  "Perception": 0,
  "Perspicacité": 0,
  "Persuasion": 0,
  "Religion": 0,
  "Représentation": 0,
  "Survie": 0
})

const race = ref('')
const classe_payload = {
  "classe": null,
  "équipements": {},
  "compétences": {},
  "maitrise": {},
  "sauvegarde": [],
  "capacités": [],
  "bonus_maitrise": ""
};

const bonus_maitrise = ref(0);

// TODO add ability to update based on level of character, current is only for level 1
const characterName = ref('')
const display = (name) => characterName.value = name

const displayRace = (value) => {
  // get previous race characteristics and remove them from caracteristiques
  let characteristics;
  if (race.value !== '') {
    characteristics = data_races['race'][race.value]['caractériques'];
    for (let carac in characteristics) {
      caracteristiques.value[carac] -= parseInt(characteristics[carac])
    }
  }
  race.value = value
  characteristics = data_races['race'][value]['caractériques'];
  for (let carac in characteristics) {
    caracteristiques.value[carac] += parseInt(characteristics[carac])
  }
}
const step = ref(2);

const updateCompetences = (oldCompetences, newCompetences) => {
  for (let comp in competences.value) {
    if (oldCompetences[comp] !== undefined && oldCompetences !== null) {
      competences.value[comp] -= parseInt(oldCompetences[comp]);
    }
    if (newCompetences[comp] !== undefined) {
      competences.value[comp] += parseInt(newCompetences[comp]);
    }
  }
}

const updateEquipements = (oldEquipements, newEquipements) => {
  for (let equip in oldEquipements) {
    if (oldEquipements[equip] !== undefined && oldEquipements !== null) {
      equipements.value.splice(equipements.value.indexOf(oldEquipements[equip]), 1);
    }
  }
  for (let equip in newEquipements) {
    if (newEquipements[equip] !== undefined) {
      equipements.value.push(newEquipements[equip]);
    }
  }
}

const displayClasse = (new_classe) => {
  updateCompetences(classe_payload['compétences'], new_classe['compétences']);
  updateEquipements(classe_payload['équipements'], new_classe['équipements']);
  classe_payload['compétences'] = JSON.parse(JSON.stringify(new_classe['compétences']));
  classe_payload['équipements'] = JSON.parse(JSON.stringify(new_classe['équipements']));
  bonus_maitrise.value = parseInt(new_classe['bonus_maitrise']);

}

</script>
