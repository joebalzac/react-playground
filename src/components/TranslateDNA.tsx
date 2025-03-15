const TranslateDNA = (sequence: string): string => {
  const codonTable: Record<string, string> = {
    ATG: "M",
    TTT: "F",
    TTC: "F",
    GAA: "E",
    GAG: "E",
    GGA: "G",
    GGG: "G",
    TAA: "STOP",
    TAG: "STOP",
    TGA: "STOP",
  };

  let protein = "";
  const startIndex = sequence.indexOf("ATG");
  if (startIndex === -1) return "";

  for (let i = startIndex; i < sequence.length; i += 3) {
    if (i + 2 >= sequence.length) break;

    const codon = sequence.substring(i, i + 3);
    if (codonTable[codon] === "STOP") break;

    if (codonTable[codon]) {
      protein += codonTable[codon];
    }
  }

  return protein;
};

export default TranslateDNA;

console.log(TranslateDNA("ATGTTTGGAGAATAG"));
console.log(TranslateDNA("TTGGAATGTTTATGGAGTGAGAAG"));
