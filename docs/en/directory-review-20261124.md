# Directory review, November 24, 2026

## Prepared change

The home page keeps the six existing categories and adds a description for every skill. The generated ES/EN catalog adds cards with requirements, expected results, dependencies, version, risk and declared review date. Platform views use exact tags for Ideavo, Atlas/OpenShip, Dokploy and Azure; tags do not certify compatibility and do not replace browsing by category.

All paths, IDs, operational skill documents and 25 experimental statuses are preserved. This review does not supply evidence for marking procedures stable or operationally tested. Metadata review dates are not execution dates. Requirements and capabilities do not grant permission to use credentials, change infrastructure or publish.

Schema, translation structure, catalog generation, destination paths and metadata-to-card consistency are checked. These tests verify the directory, not the deployment procedures described by its skills.

## Reconciliation still required

- Compare the root-level Ideavo document with the localized document using the same ID before selecting a replacement. Both remain; the catalog still points to the localized source.
- PR 16: compare Ideavo lessons with current procedures and project limits.
- PR 14: review development integration guidance against the current process.
- PR 12: review CI guidance against the current platform, without activating workflows.
- PR 4: compare OpenShip guidance with the existing cataloged skill.

No pending PR is merged or closed by this change. Project or brand scope is not inferred from names or examples. Reliable scope filters require reviewed scope metadata; project-specific instructions remain in their own projects for now.

## Second milestone: Azure

Azure Container Apps with autoscaling is still pending deployment and testing. The Azure view states that status rather than adding untested executable guidance. A skill will follow evidence of the real deployment, its tests and recovery. No Atlas/OpenShip integration, VM or deployment from Ideavo is presumed.

## Publication scope

Publication is limited to a branch and a pull request for review. No merge, project pin update or infrastructure execution. Integration requires a later decision.
