import { createInterface } from 'readline';
import { createReadStream } from 'fs';

function splitComma(line: string): string[] {
  return line.split(',');
}

function splitDash(str: string): string[] {
  return str.split('-');
}

function convertToNum(numArray: string[]) {
  return numArray.map(num => parseInt(num, 10));
}

function getRangeSet([min, max]: number[]) {
  const set = new Set<number>();
  for (let i = min; i <= max; i++) {
    set.add(i);
  }
  return set;
}

function setHasEveryElementFromOtherSet(testSet: Set<number>, compareTo: Set<number>) {
  let hasAll = true;
  for (const num of testSet.values()) {
    if (!compareTo.has(num)) {
      hasAll = false;
      break;
    }
  }
  return hasAll;
}

function setHasSomeElementFromOtherSet(testSet: Set<number>, compareTo: Set<number>) {
  let hasSome = false;
  for (const num of testSet.values()) {
    if (compareTo.has(num)) {
      hasSome = true;
      break;
    }
  }
  return hasSome;
}

function main() {
  const stream = createReadStream('input.txt', 'utf-8');
  const readline = createInterface({ input: stream });

  let fullyOverlapCounter = 0;
  let partiallyOverlapCounter = 0;

  readline.on('line', function processLine(line: string) {
    const [elf1, elf2] = splitComma(line)
      .map(splitDash)
      .map(convertToNum)
      .map(getRangeSet);

    if (
      setHasEveryElementFromOtherSet(elf1, elf2) ||
      setHasEveryElementFromOtherSet(elf2, elf1)
    ) {
      fullyOverlapCounter++;
    }

    if(setHasSomeElementFromOtherSet(elf1, elf2)) {
      partiallyOverlapCounter++;
    }
  });

  readline.on('close', function processResults() {
    console.log('Number of pairs where one range fully overlaps the other: ', fullyOverlapCounter);
    console.log('Number of pairs where ranges parially overlap: ', partiallyOverlapCounter);
  });
}

main();
