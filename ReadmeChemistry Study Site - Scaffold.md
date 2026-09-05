# Chemistry Study Site - Scaffold

## Project Structure

```
chemistry-study-site/
├── site/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── app.js
│   └── assets/
│       └── (images, animations)
├── data/
│   └── unit-1-basic-concepts.json
├── scripts/
│   └── validate_data.py
├── docker/
│   ├── Dockerfile
│   └── docker-compose.yml
└── README.md
```

---

## 1. Docker Setup

### `docker/Dockerfile`
```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install pandas for data validation scripts
RUN pip install pandas

# Copy project files
COPY . /app

# Expose port for static server
EXPOSE 8000

# Run a simple Python HTTP server from the site directory
CMD ["python", "-m", "http.server", "8000", "--directory", "/app/site"]
```

### `docker/docker-compose.yml`
```yaml
version: '3.8'

services:
  chemistry-site:
    build:
      context: .
      dockerfile: docker/Dockerfile
    ports:
      - "8000:8000"
    volumes:
      - .:/app
    command: python -m http.server 8000 --directory /app/site
```

---

## 2. Unit 1 Data Schema

### `data/unit-1-basic-concepts.json`

```json
{
  "unit": 1,
  "unit_name": "Some Basic Concepts of Chemistry",
  "color_code": "#FF6B6B",
  "concepts": [
    {
      "id": "concept-001",
      "chapter": "Dalton's Atomic Theory",
      "concept": "Matter is composed of indivisible atoms",
      "explanation_text": "Dalton proposed that all matter consists of tiny, indivisible particles called atoms. Each element has atoms of a specific mass and size. Atoms cannot be created, destroyed, or converted into atoms of another element through ordinary chemical reactions.",
      "animation_type": "particle-sphere-formation",
      "mcq_question": "Which of the following is NOT part of Dalton's Atomic Theory?",
      "mcq_options": [
        "Matter is made of atoms",
        "All atoms of the same element are identical",
        "Atoms can be destroyed in nuclear reactions",
        "Atoms combine to form compounds"
      ],
      "mcq_answer": 2,
      "pyq_year": 2022,
      "pyq_question": "Explain Dalton's atomic theory and its limitations.",
      "importance_tag": "high"
    },
    {
      "id": "concept-002",
      "chapter": "Law of Conservation of Mass",
      "concept": "Mass is neither created nor destroyed in chemical reactions",
      "explanation_text": "In any chemical reaction, the total mass of reactants equals the total mass of products. This law was stated by Antoine Lavoisier and forms the foundation for balanced chemical equations.",
      "animation_type": "mass-balance-scale",
      "mcq_question": "In the reaction: 2H₂ + O₂ → 2H₂O, if 4g of H₂ reacts with 32g of O₂, what is the mass of water formed?",
      "mcq_options": [
        "18g",
        "36g",
        "54g",
        "72g"
      ],
      "mcq_answer": 1,
      "pyq_year": 2021,
      "pyq_question": "A sample of copper ore weighing 100g was heated. The mass of the residue was 85g. Calculate the percentage of copper in the ore.",
      "importance_tag": "high"
    },
    {
      "id": "concept-003",
      "chapter": "Law of Definite Proportions",
      "concept": "A compound always contains the same elements in the same proportion by mass",
      "explanation_text": "Regardless of the source or method of preparation, a pure compound always has the same composition by mass. For example, water always contains hydrogen and oxygen in the mass ratio 1:8.",
      "animation_type": "ratio-pie-chart",
      "mcq_question": "Water always contains hydrogen and oxygen in the mass ratio:",
      "mcq_options": [
        "1:16",
        "1:8",
        "2:16",
        "1:2"
      ],
      "mcq_answer": 1,
      "pyq_year": 2023,
      "pyq_question": "Explain the law of definite proportions with an example.",
      "importance_tag": "medium"
    },
    {
      "id": "concept-004",
      "chapter": "Atomic Mass and Molecular Mass",
      "concept": "Relative masses of atoms and molecules compared to carbon-12",
      "explanation_text": "Atomic mass is the average relative mass of atoms of an element compared to 1/12th of a carbon-12 atom (unified atomic mass unit, u). Molecular mass is the sum of atomic masses of all atoms in a molecule.",
      "animation_type": "atom-mass-stacking",
      "mcq_question": "The molecular mass of CO₂ is approximately (C=12, O=16):",
      "mcq_options": [
        "28",
        "32",
        "44",
        "60"
      ],
      "mcq_answer": 2,
      "pyq_year": 2022,
      "pyq_question": "Calculate the molecular mass of H₂SO₄ and H₃PO₄. Which has a higher molecular mass?",
      "importance_tag": "high"
    },
    {
      "id": "concept-005",
      "chapter": "Mole Concept",
      "concept": "A mole is the amount of substance containing Avogadro's number of particles",
      "explanation_text": "One mole of any substance contains 6.022 × 10²³ particles (atoms, molecules, ions, or electrons). It is the fundamental unit for quantifying matter in chemistry, linking microscopic and macroscopic scales.",
      "animation_type": "particle-count-scroll",
      "mcq_question": "How many moles of oxygen atoms are present in 1 mole of H₂SO₄?",
      "mcq_options": [
        "1",
        "2",
        "4",
        "6.022 × 10²³"
      ],
      "mcq_answer": 2,
      "pyq_year": 2021,
      "pyq_question": "Calculate the number of moles in 16g of oxygen gas (O₂). How many molecules are present?",
      "importance_tag": "high"
    },
    {
      "id": "concept-006",
      "chapter": "Stoichiometry",
      "concept": "Quantitative relationships between reactants and products in chemical reactions",
      "explanation_text": "Stoichiometry uses balanced chemical equations to determine the proportions and quantities of reactants and products. It applies the law of conservation of mass and the mole concept to solve chemistry problems.",
      "animation_type": "reaction-flow-diagram",
      "mcq_question": "From the equation: 2H₂ + O₂ → 2H₂O, how many moles of water are produced from 3 moles of H₂?",
      "mcq_options": [
        "1.5",
        "3",
        "4.5",
        "6"
      ],
      "mcq_answer": 0,
      "pyq_year": 2023,
      "pyq_question": "In the reaction: 2Fe + 3Cl₂ → 2FeCl₃, if 5.6g of Fe reacts with Cl₂, calculate the mass of FeCl₃ formed. (Fe=56, Cl=35.5)",
      "importance_tag": "high"
    }
  ]
}
```

---

## 3. Data Validation Script

### `scripts/validate_data.py`

```python
import json
import pandas as pd
from pathlib import Path

def validate_concept_schema(concept):
    """Validate individual concept entry"""
    required_fields = [
        'id', 'chapter', 'concept', 'explanation_text',
        'animation_type', 'mcq_question', 'mcq_options',
        'mcq_answer', 'pyq_year', 'pyq_question', 'importance_tag'
    ]
    
    missing = [f for f in required_fields if f not in concept]
    if missing:
        return False, f"Missing fields: {missing}"
    
    if not isinstance(concept['mcq_options'], list) or len(concept['mcq_options']) != 4:
        return False, "MCQ options must be a list of 4 items"
    
    if not (0 <= concept['mcq_answer'] < 4):
        return False, "MCQ answer must be index 0-3"
    
    return True, "Valid"

def validate_unit_file(filepath):
    """Validate entire unit JSON file"""
    with open(filepath, 'r') as f:
        data = json.load(f)
    
    print(f"Validating {filepath}...")
    print(f"Unit: {data.get('unit_name')}")
    print(f"Concepts: {len(data.get('concepts', []))}\n")
    
    errors = []
    for i, concept in enumerate(data.get('concepts', [])):
        valid, msg = validate_concept_schema(concept)
        if not valid:
            errors.append(f"Concept {i} ({concept.get('id')}): {msg}")
        else:
            print(f"✓ Concept {i}: {concept.get('concept')}")
    
    if errors:
        print("\n❌ ERRORS:")
        for error in errors:
            print(f"  {error}")
        return False
    else:
        print("\n✅ All concepts valid!")
        return True

if __name__ == "__main__":
    data_file = Path(__file__).parent.parent / "data" / "unit-1-basic-concepts.json"
    validate_unit_file(data_file)
```

---

## 4. Quick Start

### To run locally:

```bash
docker-compose -f docker/docker-compose.yml up
# Visit http://localhost:8000
```

### To validate data:

```bash
python scripts/validate_data.py
```

---

## Next Steps

1. ✅ Folder structure created
2. ✅ Docker setup ready (run with one command)
3. ✅ Unit 1 data schema defined with 6 key concepts
4. ⏭️ Placeholder HTML/CSS/JS files (to be built after data schema approval)

**Review the data schema and let me know if:**
- Animation types match your vision
- Fields are sufficient
- Concepts/questions/importance tags are appropriate
- Any adjustments needed before building the UI
