-- Vertex Restaurant Manager seed data
-- Run after schema.sql

USE vertex_restaurant;

START TRANSACTION;

INSERT INTO roles (id, name, description) VALUES
  (1, 'owner', 'Admin/Owner with full access'),
  (2, 'manager', 'Branch manager operations'),
  (3, 'cashier', 'POS and billing'),
  (4, 'waiter', 'Table and order handling'),
  (5, 'chef', 'Kitchen/KOT handling'),
  (6, 'inventory_manager', 'Inventory operations'),
  (7, 'purchase_manager', 'Vendor and purchasing'),
  (8, 'accounts_manager', 'Expenses and payments'),
  (9, 'delivery_staff', 'Delivery execution')
ON DUPLICATE KEY UPDATE
  description = VALUES(description);

INSERT INTO branches (id, name, code, address, city, state, pincode, gst_number, phone, email, is_active) VALUES
  (1, 'Vertex Main Branch', 'VRM-HQ', 'MG Road', 'Bengaluru', 'Karnataka', '560001', '29ABCDE1234F1Z5', '9999999999', 'hq@vertexrm.local', 1)
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  address = VALUES(address),
  city = VALUES(city),
  state = VALUES(state),
  pincode = VALUES(pincode),
  gst_number = VALUES(gst_number),
  phone = VALUES(phone),
  email = VALUES(email),
  is_active = VALUES(is_active);

INSERT INTO users (id, role_id, full_name, email, phone, password_hash, status) VALUES
  (1, 1, 'System Admin', 'admin@vertex.com', '9999990001', 'admin123', 'active'),
  (2, 2, 'Branch Manager', 'manager@vertex.com', '9999990002', 'manager123', 'active'),
  (3, 3, 'Main Cashier', 'cashier@vertex.com', '9999990003', 'cashier123', 'active'),
  (4, 4, 'Captain Arun', 'waiter@vertex.com', '9999990004', 'waiter123', 'active'),
  (5, 5, 'Chef Rakesh', 'chef@vertex.com', '9999990005', 'chef123', 'active'),
  (6, 6, 'Inventory Lead', 'inventory@vertex.com', '9999990006', 'inventory123', 'active'),
  (7, 7, 'Purchase Lead', 'purchase@vertex.com', '9999990007', 'purchase123', 'active'),
  (8, 8, 'Accounts Lead', 'accounts@vertex.com', '9999990008', 'accounts123', 'active'),
  (9, 9, 'Delivery Rider', 'delivery@vertex.com', '9999990009', 'delivery123', 'active')
ON DUPLICATE KEY UPDATE
  role_id = VALUES(role_id),
  full_name = VALUES(full_name),
  email = VALUES(email),
  phone = VALUES(phone),
  password_hash = VALUES(password_hash),
  status = VALUES(status);

INSERT INTO staff (id, user_id, branch_id, employee_code, designation, joining_date, salary, status) VALUES
  (1, 2, 1, 'EMP-MGR-001', 'Manager', '2026-01-01', 50000.00, 'active'),
  (2, 3, 1, 'EMP-CAS-001', 'Cashier', '2026-01-01', 25000.00, 'active'),
  (3, 4, 1, 'EMP-WTR-001', 'Waiter', '2026-01-01', 18000.00, 'active'),
  (4, 5, 1, 'EMP-CHF-001', 'Chef', '2026-01-01', 32000.00, 'active'),
  (5, 6, 1, 'EMP-INV-001', 'Inventory Manager', '2026-01-01', 30000.00, 'active'),
  (6, 7, 1, 'EMP-PUR-001', 'Purchase Manager', '2026-01-01', 30000.00, 'active'),
  (7, 8, 1, 'EMP-ACC-001', 'Accounts Manager', '2026-01-01', 32000.00, 'active')
ON DUPLICATE KEY UPDATE
  user_id = VALUES(user_id),
  branch_id = VALUES(branch_id),
  designation = VALUES(designation),
  salary = VALUES(salary),
  status = VALUES(status);

INSERT INTO shifts (id, branch_id, name, start_time, end_time) VALUES
  (1, 1, 'Morning', '08:00:00', '16:00:00'),
  (2, 1, 'Evening', '16:00:00', '23:00:00')
ON DUPLICATE KEY UPDATE
  branch_id = VALUES(branch_id),
  name = VALUES(name),
  start_time = VALUES(start_time),
  end_time = VALUES(end_time);

INSERT INTO restaurant_tables (id, branch_id, table_number, seating_capacity, area, status) VALUES
  (1, 1, 'T1', 4, 'Ground Floor', 'available'),
  (2, 1, 'T2', 2, 'Ground Floor', 'available'),
  (3, 1, 'T3', 6, 'Family Zone', 'available')
ON DUPLICATE KEY UPDATE
  branch_id = VALUES(branch_id),
  seating_capacity = VALUES(seating_capacity),
  area = VALUES(area),
  status = VALUES(status);

INSERT INTO menu_categories (id, branch_id, name, description, sort_order, is_active) VALUES
  (1, 1, 'Main Course', 'North Indian mains', 1, 1),
  (2, 1, 'Beverages', 'Hot and cold drinks', 2, 1)
ON DUPLICATE KEY UPDATE
  description = VALUES(description),
  sort_order = VALUES(sort_order),
  is_active = VALUES(is_active);

INSERT INTO menu_items (id, category_id, branch_id, item_code, name, description, price, tax_percent, is_veg, is_available, preparation_time) VALUES
  (1, 1, 1, 'MI-001', 'Paneer Butter Masala', 'Rich tomato-based curry', 260.00, 5.00, 1, 1, 20),
  (2, 1, 1, 'MI-002', 'Jeera Rice', 'Basmati rice with cumin', 140.00, 5.00, 1, 1, 15),
  (3, 2, 1, 'MI-003', 'Masala Chai', 'Indian spiced tea', 40.00, 5.00, 1, 1, 8)
ON DUPLICATE KEY UPDATE
  category_id = VALUES(category_id),
  branch_id = VALUES(branch_id),
  name = VALUES(name),
  description = VALUES(description),
  price = VALUES(price),
  tax_percent = VALUES(tax_percent),
  is_veg = VALUES(is_veg),
  is_available = VALUES(is_available),
  preparation_time = VALUES(preparation_time);

INSERT INTO customers (id, branch_id, full_name, phone, email, address, customer_type) VALUES
  (1, 1, 'Walk-in Customer', '9000000001', NULL, NULL, 'walkin')
ON DUPLICATE KEY UPDATE
  full_name = VALUES(full_name),
  phone = VALUES(phone),
  customer_type = VALUES(customer_type);

INSERT INTO raw_materials (id, branch_id, item_code, name, unit, current_stock, reorder_level, last_purchase_price, is_active) VALUES
  (1, 1, 'RM-001', 'Basmati Rice', 'kg', 100.00, 25.00, 70.00, 1),
  (2, 1, 'RM-002', 'Cooking Oil', 'ltr', 80.00, 20.00, 140.00, 1),
  (3, 1, 'RM-003', 'Paneer', 'kg', 40.00, 10.00, 280.00, 1)
ON DUPLICATE KEY UPDATE
  branch_id = VALUES(branch_id),
  name = VALUES(name),
  unit = VALUES(unit),
  current_stock = VALUES(current_stock),
  reorder_level = VALUES(reorder_level),
  last_purchase_price = VALUES(last_purchase_price),
  is_active = VALUES(is_active);

INSERT INTO vendors (id, branch_id, name, contact_person, phone, email, address, gst_number) VALUES
  (1, 1, 'Fresh Farm Supplies', 'Amit Sharma', '9888888801', 'freshfarm@example.com', 'Market Yard, Bengaluru', '29AAAAA1111A1Z1')
ON DUPLICATE KEY UPDATE
  branch_id = VALUES(branch_id),
  name = VALUES(name),
  contact_person = VALUES(contact_person),
  phone = VALUES(phone),
  email = VALUES(email),
  address = VALUES(address),
  gst_number = VALUES(gst_number);

INSERT INTO expense_categories (id, branch_id, name, description) VALUES
  (1, 1, 'Utilities', 'Electricity, water, and internet')
ON DUPLICATE KEY UPDATE
  description = VALUES(description);

INSERT INTO orders (id, branch_id, customer_id, table_id, order_no, order_type, order_status, guest_count, subtotal, tax_amount, discount_amount, grand_total, created_by) VALUES
  (1, 1, 1, 1, 'ORD-1001', 'dine_in', 'completed', 2, 400.00, 20.00, 0.00, 420.00, 3)
ON DUPLICATE KEY UPDATE
  branch_id = VALUES(branch_id),
  customer_id = VALUES(customer_id),
  table_id = VALUES(table_id),
  order_type = VALUES(order_type),
  order_status = VALUES(order_status),
  guest_count = VALUES(guest_count),
  subtotal = VALUES(subtotal),
  tax_amount = VALUES(tax_amount),
  discount_amount = VALUES(discount_amount),
  grand_total = VALUES(grand_total),
  created_by = VALUES(created_by);

INSERT INTO order_items (id, order_id, menu_item_id, quantity, unit_price, tax_percent, item_status, line_total) VALUES
  (1, 1, 1, 1, 260.00, 5.00, 'served', 273.00),
  (2, 1, 2, 1, 140.00, 5.00, 'served', 147.00)
ON DUPLICATE KEY UPDATE
  order_id = VALUES(order_id),
  menu_item_id = VALUES(menu_item_id),
  quantity = VALUES(quantity),
  unit_price = VALUES(unit_price),
  tax_percent = VALUES(tax_percent),
  item_status = VALUES(item_status),
  line_total = VALUES(line_total);

INSERT INTO kots (id, order_id, kot_no, status, kitchen_note) VALUES
  (1, 1, 'KOT-1001', 'served', 'Completed')
ON DUPLICATE KEY UPDATE
  order_id = VALUES(order_id),
  status = VALUES(status),
  kitchen_note = VALUES(kitchen_note);

INSERT INTO kot_items (id, kot_id, order_item_id, status) VALUES
  (1, 1, 1, 'served'),
  (2, 1, 2, 'served')
ON DUPLICATE KEY UPDATE
  kot_id = VALUES(kot_id),
  order_item_id = VALUES(order_item_id),
  status = VALUES(status);

INSERT INTO invoices (id, order_id, invoice_no, invoice_date, subtotal, tax_amount, discount_amount, service_charge, grand_total, payment_status, created_by) VALUES
  (1, 1, 'INV-1001', NOW(), 400.00, 20.00, 0.00, 0.00, 420.00, 'paid', 3)
ON DUPLICATE KEY UPDATE
  order_id = VALUES(order_id),
  invoice_date = VALUES(invoice_date),
  subtotal = VALUES(subtotal),
  tax_amount = VALUES(tax_amount),
  discount_amount = VALUES(discount_amount),
  service_charge = VALUES(service_charge),
  grand_total = VALUES(grand_total),
  payment_status = VALUES(payment_status),
  created_by = VALUES(created_by);

INSERT INTO invoice_items (id, invoice_id, menu_item_id, quantity, unit_price, tax_percent, line_total) VALUES
  (1, 1, 1, 1, 260.00, 5.00, 273.00),
  (2, 1, 2, 1, 140.00, 5.00, 147.00)
ON DUPLICATE KEY UPDATE
  invoice_id = VALUES(invoice_id),
  menu_item_id = VALUES(menu_item_id),
  quantity = VALUES(quantity),
  unit_price = VALUES(unit_price),
  tax_percent = VALUES(tax_percent),
  line_total = VALUES(line_total);

INSERT INTO payments (id, invoice_id, payment_mode, reference_no, amount, paid_at, note) VALUES
  (1, 1, 'upi', 'TXN-INV-1001', 420.00, NOW(), 'Full payment collected')
ON DUPLICATE KEY UPDATE
  invoice_id = VALUES(invoice_id),
  payment_mode = VALUES(payment_mode),
  reference_no = VALUES(reference_no),
  amount = VALUES(amount),
  paid_at = VALUES(paid_at),
  note = VALUES(note);

INSERT INTO stock_entries (id, branch_id, entry_no, vendor_id, entry_date, note, created_by) VALUES
  (1, 1, 'SE-1001', 1, CURDATE(), 'Opening stock entry', 2)
ON DUPLICATE KEY UPDATE
  branch_id = VALUES(branch_id),
  vendor_id = VALUES(vendor_id),
  entry_date = VALUES(entry_date),
  note = VALUES(note),
  created_by = VALUES(created_by);

INSERT INTO stock_entry_items (id, stock_entry_id, raw_material_id, quantity, unit_price, line_total) VALUES
  (1, 1, 1, 20.00, 70.00, 1400.00),
  (2, 1, 2, 10.00, 140.00, 1400.00)
ON DUPLICATE KEY UPDATE
  stock_entry_id = VALUES(stock_entry_id),
  raw_material_id = VALUES(raw_material_id),
  quantity = VALUES(quantity),
  unit_price = VALUES(unit_price),
  line_total = VALUES(line_total);

INSERT INTO stock_issues (id, branch_id, issue_no, issue_date, kitchen_note, created_by) VALUES
  (1, 1, 'SI-1001', CURDATE(), 'Issued to kitchen', 2)
ON DUPLICATE KEY UPDATE
  branch_id = VALUES(branch_id),
  issue_date = VALUES(issue_date),
  kitchen_note = VALUES(kitchen_note),
  created_by = VALUES(created_by);

INSERT INTO stock_issue_items (id, stock_issue_id, raw_material_id, quantity) VALUES
  (1, 1, 1, 5.00)
ON DUPLICATE KEY UPDATE
  stock_issue_id = VALUES(stock_issue_id),
  raw_material_id = VALUES(raw_material_id),
  quantity = VALUES(quantity);

INSERT INTO stock_adjustments (id, branch_id, raw_material_id, adjustment_type, quantity, reason, adjusted_at, created_by) VALUES
  (1, 1, 1, 'subtract', 1.00, 'Spoilage adjustment', NOW(), 2)
ON DUPLICATE KEY UPDATE
  branch_id = VALUES(branch_id),
  raw_material_id = VALUES(raw_material_id),
  adjustment_type = VALUES(adjustment_type),
  quantity = VALUES(quantity),
  reason = VALUES(reason),
  adjusted_at = VALUES(adjusted_at),
  created_by = VALUES(created_by);

INSERT INTO wastage_entries (id, branch_id, raw_material_id, quantity, reason, wastage_date, created_by) VALUES
  (1, 1, 1, 0.50, 'Prep wastage', CURDATE(), 2)
ON DUPLICATE KEY UPDATE
  branch_id = VALUES(branch_id),
  raw_material_id = VALUES(raw_material_id),
  quantity = VALUES(quantity),
  reason = VALUES(reason),
  wastage_date = VALUES(wastage_date),
  created_by = VALUES(created_by);

INSERT INTO purchase_orders (id, branch_id, vendor_id, po_no, po_date, status, total_amount, note, created_by) VALUES
  (1, 1, 1, 'PO-1001', CURDATE(), 'received', 2000.00, 'Weekly replenishment', 2)
ON DUPLICATE KEY UPDATE
  branch_id = VALUES(branch_id),
  vendor_id = VALUES(vendor_id),
  po_date = VALUES(po_date),
  status = VALUES(status),
  total_amount = VALUES(total_amount),
  note = VALUES(note),
  created_by = VALUES(created_by);

INSERT INTO purchase_order_items (id, purchase_order_id, raw_material_id, quantity, unit_price, line_total) VALUES
  (1, 1, 3, 5.00, 280.00, 1400.00)
ON DUPLICATE KEY UPDATE
  purchase_order_id = VALUES(purchase_order_id),
  raw_material_id = VALUES(raw_material_id),
  quantity = VALUES(quantity),
  unit_price = VALUES(unit_price),
  line_total = VALUES(line_total);

INSERT INTO purchases (id, branch_id, vendor_id, purchase_no, purchase_date, invoice_no, subtotal, tax_amount, grand_total, payment_status, created_by) VALUES
  (1, 1, 1, 'PUR-1001', CURDATE(), 'VEND-INV-88', 1400.00, 70.00, 1470.00, 'partial', 2)
ON DUPLICATE KEY UPDATE
  branch_id = VALUES(branch_id),
  vendor_id = VALUES(vendor_id),
  purchase_date = VALUES(purchase_date),
  invoice_no = VALUES(invoice_no),
  subtotal = VALUES(subtotal),
  tax_amount = VALUES(tax_amount),
  grand_total = VALUES(grand_total),
  payment_status = VALUES(payment_status),
  created_by = VALUES(created_by);

INSERT INTO purchase_items (id, purchase_id, raw_material_id, quantity, unit_price, tax_percent, line_total) VALUES
  (1, 1, 3, 5.00, 280.00, 5.00, 1470.00)
ON DUPLICATE KEY UPDATE
  purchase_id = VALUES(purchase_id),
  raw_material_id = VALUES(raw_material_id),
  quantity = VALUES(quantity),
  unit_price = VALUES(unit_price),
  tax_percent = VALUES(tax_percent),
  line_total = VALUES(line_total);

INSERT INTO purchase_returns (id, purchase_id, return_no, return_date, reason, total_amount, created_by) VALUES
  (1, 1, 'PR-1001', CURDATE(), 'Quality issue in batch', 280.00, 2)
ON DUPLICATE KEY UPDATE
  purchase_id = VALUES(purchase_id),
  return_date = VALUES(return_date),
  reason = VALUES(reason),
  total_amount = VALUES(total_amount),
  created_by = VALUES(created_by);

INSERT INTO purchase_return_items (id, purchase_return_id, raw_material_id, quantity, unit_price, line_total) VALUES
  (1, 1, 3, 1.00, 280.00, 280.00)
ON DUPLICATE KEY UPDATE
  purchase_return_id = VALUES(purchase_return_id),
  raw_material_id = VALUES(raw_material_id),
  quantity = VALUES(quantity),
  unit_price = VALUES(unit_price),
  line_total = VALUES(line_total);

INSERT INTO delivery_staff (id, branch_id, full_name, phone, vehicle_number, status) VALUES
  (1, 1, 'Ravi Kumar', '9888888802', 'KA-01-AB-1234', 'active')
ON DUPLICATE KEY UPDATE
  branch_id = VALUES(branch_id),
  full_name = VALUES(full_name),
  phone = VALUES(phone),
  vehicle_number = VALUES(vehicle_number),
  status = VALUES(status);

INSERT INTO deliveries (id, order_id, delivery_staff_id, delivery_address, delivery_status, assigned_at, note) VALUES
  (1, 1, 1, 'Sample address', 'delivered', NOW(), 'Delivered on time')
ON DUPLICATE KEY UPDATE
  order_id = VALUES(order_id),
  delivery_staff_id = VALUES(delivery_staff_id),
  delivery_address = VALUES(delivery_address),
  delivery_status = VALUES(delivery_status),
  assigned_at = VALUES(assigned_at),
  note = VALUES(note);

INSERT INTO expenses (id, branch_id, category_id, expense_date, description, amount, payment_mode, reference_no, created_by) VALUES
  (1, 1, 1, CURDATE(), 'Electricity bill', 8500.00, 'bank', 'EB-2026-03', 2)
ON DUPLICATE KEY UPDATE
  branch_id = VALUES(branch_id),
  category_id = VALUES(category_id),
  expense_date = VALUES(expense_date),
  description = VALUES(description),
  amount = VALUES(amount),
  payment_mode = VALUES(payment_mode),
  reference_no = VALUES(reference_no),
  created_by = VALUES(created_by);

INSERT INTO vendor_payments (id, vendor_id, purchase_id, amount, payment_mode, reference_no, paid_at, note) VALUES
  (1, 1, 1, 700.00, 'bank', 'VPAY-1001', NOW(), 'Partial payment')
ON DUPLICATE KEY UPDATE
  vendor_id = VALUES(vendor_id),
  purchase_id = VALUES(purchase_id),
  amount = VALUES(amount),
  payment_mode = VALUES(payment_mode),
  reference_no = VALUES(reference_no),
  paid_at = VALUES(paid_at),
  note = VALUES(note);

INSERT INTO customer_receipts (id, customer_id, invoice_id, amount, receipt_mode, reference_no, received_at, note) VALUES
  (1, 1, 1, 420.00, 'upi', 'CR-1001', NOW(), 'Invoice fully settled')
ON DUPLICATE KEY UPDATE
  customer_id = VALUES(customer_id),
  invoice_id = VALUES(invoice_id),
  amount = VALUES(amount),
  receipt_mode = VALUES(receipt_mode),
  reference_no = VALUES(reference_no),
  received_at = VALUES(received_at),
  note = VALUES(note);

INSERT INTO audit_logs (id, user_id, module_name, action_type, record_id, description, ip_address) VALUES
  (1, 1, 'system', 'create', NULL, 'Initial seed executed', '127.0.0.1')
ON DUPLICATE KEY UPDATE
  user_id = VALUES(user_id),
  module_name = VALUES(module_name),
  action_type = VALUES(action_type),
  record_id = VALUES(record_id),
  description = VALUES(description),
  ip_address = VALUES(ip_address);

COMMIT;

