import { Component, ViewChild, Pipe, ElementRef } from '@angular/core';


@Pipe({ name: 'numOfRows' })
export class NumOfRows {
  transform(input: number) {
    return Math.ceil(input / 4);
  }
}
@Pipe({ name: 'numberToLetter' })
export class NumberToLetter {
  transform(input: number) {
    return String.fromCharCode(65 + input);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('operationInput') operationInputElem: ElementRef;
  public showWelcomeMessage = true;
  public sets: Set<any>[] = [];
  public changeSetNameVisibility = [];
  public setsNames: string[] = [];
  public arr = Array;
  public activePanel = true;
  public operationString = '';

  constructor() { }

  calculateSetOperation() {
    this.calculate(this.operationString)
      .then(resultSet => {
        this.setsNames.push('Resultado de: ' + this.operationString.toUpperCase());
        this.changeSetNameVisibility.push(false);
        this.sets.push(resultSet);
        this.operationString = String.fromCharCode(65 + this.sets.length - 1);
      })
      .catch(error => alert(error))
    this.operationInputElem.nativeElement.focus();
  }

  calculate(expression: string, sets: Set<any>[] = []): Promise<Set<any>> {
    let operators = [];
    let lastChecked = 0;
    for (let key of expression.toUpperCase()) {
      if (sets.length >= 2) break;

      if (65 <= key.charCodeAt(0) && key.charCodeAt(0) <= 90) {
        if (typeof this.sets[key.charCodeAt(0) - 65] == 'undefined') {
          return Promise.reject('Por lo menos uno de los conjuntos ingresados no existe');
        }
        sets.push(this.sets[key.charCodeAt(0) - 65]);
      }
      else if (key == 'Ω') {
        let universe = new Set();
        this.sets.forEach(set => universe = universe.union(set));
        sets.push(universe);
      }
      else if (key == '∅') sets.push(new Set());
      else if (key == '∪') operators.push('union');
      else if (key == '∩') operators.push('intersection');
      else if (key == '\\') operators.push('difference');

      lastChecked++;
    }
    if (operators.length == 1 && sets.length == 2) {
      if (lastChecked < expression.length) {
        return Promise.resolve(this.calculate(expression.substring(lastChecked), [this.performOperation(sets, operators[0])]));
      } else {
        return Promise.resolve(this.performOperation(sets, operators[0]));
      }
    } else {
      return Promise.reject('Error de sintaxis');
    }

  }

  performOperation(sets: Set<any>[], operator: string): Set<any> {
    switch (operator) {
      case 'union':
        return sets[0].union(sets[1]);
      case 'intersection':
        return sets[0].intersection(sets[1]);
      case 'difference':
        return sets[0].difference(sets[1]);
      default:
        break;
    }
  }

  appendOperator(operator) {
    let caretPos = this.operationInputElem.nativeElement.selectionStart;
    let actualText = this.operationString;
    this.operationString = actualText.substring(0, caretPos) + operator + actualText.substring(caretPos);
    this.operationInputElem.nativeElement.focus();
  }

  hideSuperPanel() {
    if (this.sets.length > 0) this.activePanel = false;
  }

  showSuperPanel() {
    this.activePanel = true;
  }

  showChangeSetNameInput(setIndex) {
    this.changeSetNameVisibility[setIndex] = true;
  }

  addSet() {
    this.showWelcomeMessage = false;
    this.setsNames.push('Nuevo Conjunto');
    this.changeSetNameVisibility.push(true)
    this.sets.push(new Set());
  }

  deleteSet(setIndex) {
    this.setsNames.splice(setIndex, 1);
    this.changeSetNameVisibility.splice(setIndex, 1);
    this.sets.splice(setIndex, 1);
  }

  changeSetName(setIndex, newName) {
    if (newName != '') {
      this.setsNames[setIndex] = newName;
      this.changeSetNameVisibility[setIndex] = false;
    }

  }

  addItem(setIndex, newValue) {
    if (newValue != '') this.sets[setIndex].add(newValue);
  }

  deleteItem(setIndex, item) {
    this.sets[setIndex].delete(item);
  }

  getSubsets(array: any[]): any[] {
    if (array.length == 1) {
      return [[], array];
    } else {
      let e = array.pop();
      let s = this.getSubsets(array);
      let s1 = s.concat(JSON.parse(JSON.stringify(s)));
      for (let i = s.length; i < s1.length; i++) {
        s1[i].push(e);
      }
      return s1;
    }
  }

}