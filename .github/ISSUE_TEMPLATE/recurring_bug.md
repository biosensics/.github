name: "Duplicate Bug!"
description: "Bug is present within multiple projets"
title: "[Duplicate Bug]: "
labels: ["duplicate bug"]
assignees: 
  -abbylindsay

body:
  - type: textarea
    attributes:
      label: Describe the bug - actual behavior
      description: Please justify why you think this is the same as a previously identified bug
    validations:
      required: true
  - type: textarea
    attributes:
      label: Link to intial bug issue:
      placeholder: "https://github.com/biosensics/mgh-psp/issues/547"
    validations:
      required: true
  - type: textarea
    attributes:
      label: Additional Context:
      description: Screenshots, app version, firmware version, etc.
    validations:
      required: true
