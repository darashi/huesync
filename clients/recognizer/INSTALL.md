# Julius

## Install

    brew tap oame/nlp
    brew install julius julius-dictation-kit

## Recognize

    julius -w color.dict -h `brew --prefix julius-dictation-kit`/share/model/phone_m/hmmdefs_ptm_gid.binhmm -hlist `brew --prefix julius-dictation-kit`/share/model/phone_m/logicalTri -input mic -nolog -cutsilence
