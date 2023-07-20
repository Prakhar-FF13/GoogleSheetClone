import "./PageActions.css";

/**
 * This component is used to create Main Menu.
 * Functionality is yet to be coded.
 *
 */
export default function PageActions() {
  return (
    <div className="page-actions-container">
      <div className="page-actions">Home</div>
      <div className="page-actions page-actions-active">File</div>
      <div className="page-actions">Insert</div>
      <div className="page-actions">Layout</div>
      <div className="page-actions">Help</div>
    </div>
  );
}
