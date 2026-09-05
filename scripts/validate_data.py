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
