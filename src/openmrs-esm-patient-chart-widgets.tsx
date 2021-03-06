import "./set-public-path";

export { backendDependencies } from "./openmrs-backend-dependencies";
export const importTranslation = require.context(
  "../translations",
  false,
  /.json$/,
  "lazy"
);

export { default as SummaryCard } from "./ui-components/cards/summary-card.component";
export { default as SummaryCardRow } from "./ui-components/cards/summary-card-row.component";
export { default as SummaryCardFooter } from "./ui-components/cards/summary-card-footer.component";
export { default as SummaryCardRowContent } from "./ui-components/cards/summary-card-row-content.component";
export { default as HorizontalLabelValue } from "./ui-components/cards/horizontal-label-value.component";
export { default as VerticalLabelValue } from "./ui-components/cards/vertical-label-value.component";

export { Tabs, Panel } from "./ui-components/tabs/tabs.component";

export { default as Breadcrumbs } from "./ui-components/breadcrumbs/breadcrumbs.component";

export { default as AllergiesOverview } from "./widgets/allergies/allergy-overview.component";
export { default as AllergiesSummary } from "./widgets/allergies/allergy-card-level-two.component";
export { default as AllergyDetailedSummary } from "./widgets/allergies/allergy-card-level-three.component";
export { default as AllergyForm } from "./widgets/allergies/allergy-form.component";

export { default as AppointmentsOverview } from "./widgets/appointments/appointments-overview.component";
export { default as AppointmentsForm } from "./widgets/appointments/appointments-form.component";

export { default as PatientBanner } from "./widgets/banner/patient-banner.component";

export { default as ConditionsOverview } from "./widgets/conditions/conditions-overview.component";
export { default as ConditionsSummary } from "./widgets/conditions/conditions-summary.component";
export { default as ConditionDetailedSummary } from "./widgets/conditions/conditions-detailed-summary.component";

export { default as HeightAndWeightOverview } from "./widgets/heightandweight/heightandweight-overview.component";
export { default as HeightAndWeightSummary } from "./widgets/heightandweight/heightandweight-summary.component";
export { default as HeightAndWeightDetailedSummary } from "./widgets/heightandweight/heightandweight-detailed-summary.component";

export { default as MedicationsOverview } from "./widgets/medications/medications-overview.component";
export { default as MedicationsSummary } from "./widgets/medications/medications.component";

export { default as MedicationOrderBasket } from "./widgets/medications/medication-order-basket.component";
export { default as MedicationOrder } from "./widgets/medications/medication-order.component";

export { default as NotesOverview } from "./widgets/notes/notes-overview.component";
export { default as NotesSummary } from "./widgets/notes/notes-summary.component";

export { default as Profile } from "./widgets/profile/profile-section.component";

export { default as ProgramsOverview } from "./widgets/programs/programs-overview.component";
export { default as ProgramsSummary } from "./widgets/programs/programs-summary.component";
export { default as ProgramDetailedSummary } from "./widgets/programs/programs-detailed-summary.component";

export { default as VitalsOverview } from "./widgets/vitals/vitals-overview.component";
export { default as VitalsSummary } from "./widgets/vitals/vitals-detailed-summary.component";
export { default as VitalsForm } from "./widgets/vitals/vitals-form.component";
