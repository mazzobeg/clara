import skills from '@/assets/skills.json'

function getSkills() {
    return skills;
}

function getSkillIdByName(name) {
    let skill = Object.entries(skills).find(skill => {
        console.log("getSkillIdByName", skill);
        return skill[1].name == name
    })
    return skill[0]
}

function getCaracteristic(skillId) {
    return skills[skillId].caracteristic
}

export default {
    getSkills,
    getSkillIdByName,
    getCaracteristic,
}