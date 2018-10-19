class Character {
  constructor(params) {
    this.name = params.name;
    this.initialHp = params.hp;
    this.hp = params.hp;
    this.initialMp = params.mp;
    this.mp = params.mp; 
    this.offensePower = params.offensePower;
    this.defencePower = params.defencePower;
  }

  showStatus() {
    const mainEl = document.getElementById('main');
    const newDiv = document.createElement('div')
    newDiv.innerHTML = `<p>${this.name} HP: ${this.hp} MP: ${this.mp}</p>`
    mainEl.appendChild(newDiv);
  }

  attack(defender) {
    const mainEl = document.getElementById('main');
    const newDiv = document.createElement('div')
    if (this.hp <= 0) {
      newDiv.innerHTML = `<p>${this.name}は死んでいるため攻撃出来ない。</p>`;
      mainEl.appendChild(newDiv);
      return
    }
    if (defender.hp <= 0) {
      newDiv.innerHTML = `<p>${defender.name}は死んでいるため攻撃出来ない。</p>`
      mainEl.appendChild(newDiv);
      return
    }
    const damage = this.calcAttackDamage(defender);
    defender.hp = defender.hp - damage;
    if (defender.hp <= 0) {
      newDiv.innerHTML = `<p>${this.name}は${defender.name}に${damage}のダメージを与えた。${defender.name}は死亡した。</p>`
    } else {
      newDiv.innerHTML = `<p>${this.name}は${defender.name}に${damage}のダメージを与えた。</p>`;
    }
    mainEl.appendChild(newDiv);
  }

  calcAttackDamage(defender) {
    let damage = this.offensePower - defender.defencePower;
    if (damage <= 0) {
      damage = 1;
    }
    return damage;
  }
}

class Sorcerer extends Character {
  constructor(params) {
    super(params);
  }

  healSpell(target) {
    const mainEl = document.getElementById('main');
    const newDiv = document.createElement('div')
    if (this.hp <= 0) {
      newDiv.innerHTML = `<p>${this.name}は死んでいるため魔法が唱えられない。</p>`;
      mainEl.appendChild(newDiv);
      return 
    }
    if (target.hp <= 0) {
      newDiv.innerHTML = `<p>${target.name}は死んでいるため回復出来ない。</p>`
      mainEl.appendChild(newDiv);
      return
    }
    if (this.mp >= 3) {
      target.hp = target.hp + 15;
      this.mp = this.mp - 3; 
      newDiv.innerHTML = `<p>${this.name}は回復魔法を唱えた。${target.name}のHPが15回復した。</p>`
    } else {
      newDiv.innerHTML = "<p>MPが足りない！</p>";
    }
    mainEl.appendChild(newDiv);
  }

  fireSpell(target) {
    const mainEl = document.getElementById('main');
    const newDiv = document.createElement('div')
    if (this.hp <= 0) {
      newDiv.innerHTML = `<p>${this.name}は死んでいるため魔法が唱えられない。</p>`;
      mainEl.appendChild(newDiv);
      return
    }
    if (target.hp <= 0) {
      newDiv.innerHTML = `<p>${target.name}は死んでいるため攻撃出来ない。</p>`
      mainEl.appendChild(newDiv);
      return
    }
    if (this.mp >= 2) {
      target.hp = target.hp - 10;
      this.mp = this.mp - 2;
      newDiv.innerHTML = `<p>${this.name}は攻撃魔法を唱えた。${target.name}に10のダメージを与えた。</p>`
    } else {
      newDiv.innerHTML = "<p>MPが足りない！</p>";
    }
  }
}

{
  const fighter = new Character({
    name: '武道家',
    hp: 40,
    mp: 0,
    offensePower: 15,
    defencePower: 10
  })
  const sorcerer = new Sorcerer({
    name: '魔法使い',
    hp: 25,
    mp: 10,
    offensePower: 8,
    defencePower: 10
  })
  const monster = new Character({
    name: 'モンスター',
    hp: 60,
    mp: 0,
    offensePower: 30,
    defencePower: 10
  })

  fighter.attack(monster);
  sorcerer.attack(monster);
  monster.attack(sorcerer);
  fighter.attack(monster);
  sorcerer.healSpell(sorcerer);
  monster.attack(fighter);
  fighter.attack(monster);
  sorcerer.fireSpell(monster);
  monster.attack(fighter);
  fighter.showStatus();
  sorcerer.showStatus();
  monster.showStatus();
  fighter.attack(monster);
  sorcerer.healSpell(fighter);
  monster.attack(fighter);
}