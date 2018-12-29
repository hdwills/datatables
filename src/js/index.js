var $ = require('jquery');
var DataTable = require('datatables.net-bs');
var DataTableSelect = require('datatables.net-select');
var DataTableScroller = require('datatables.net-scroller');
var DataTableFixedColumns = require('datatables.net-fixedcolumns');

import 'datatables.net-bs/css/dataTables.bootstrap.css';
import 'datatables.net-select-bs/css/select.bootstrap.min.css';
import 'datatables.net-scroller-bs/css/scroller.bootstrap.min.css';
import 'datatables.net-fixedColumns-bs/css/fixedColumns.bootstrap.min.css';

var dTable;

$(function () {
  let colTable = [];

  if (localStorage.getItem('datatableCols')) {
    colTable = colStorage.fetch();
  } else {
    $('.toggle-vis').each(function () {
      let dTableColumn = {
        title: upperFirst($(this).attr('id')),
        name: $(this).attr('id'),
        visible: $(this).is(':checked'),
        targets: $(this).attr('data-column-index')
      }
      colTable.push(dTableColumn);
    });
    colStorage.save(colTable);
  }

  dTable = $('.table-datatable').DataTable({
    ajax: './static/data.json',
    columns: colTable,
    // info: false,
    // paging: false,
    // ordering: false,
    // searching: false,
    scrollX: true,
    scrollY: '300px',
    scrollCollapse: false, // 如果没有使用 scrollY 属性，表示和表格数据同步，表格数据减少时，表格的高度也跟着减少
    retrieve: true, // 如果已经初始化了，则继续使用之前的 Datatables 实例
    select: 'single',
    fixedColumns: {
      leftColumns: 0,
      rightColumns: 1
    }
  })

  $('.toggle-vis').on('change', function (e) {
    let colVisible = [];
    e.stopPropagation();
    let column = dTable.column($(this).attr('id') + ':name');
    column.visible(!column.visible());
    $('.toggle-vis').each(function () {
      colVisible.push({
        title: upperFirst($(this).attr('id')),
        name: $(this).attr('id'),
        visible: $(this).is(':checked'),
        targets: $(this).attr('data-column-index')
      })
    })
    colStorage.save(colVisible);
  })
});
window.onresize = function () {
  dTable.columns.adjust().draw();
  dTable.rows().recalcHeight().draw();
}

function upperFirst(str) {
  let temp = str.split('');
  let upperFirst = temp.shift().toLocaleUpperCase();
  temp.unshift(upperFirst);
  return temp.join('');
}

var colStorage = {
  fetch: function () {
    var cols = JSON.parse(localStorage.getItem('datatableCols') || '[]');
    cols.forEach(function (col, index) {
      document.querySelectorAll('.toggle-vis')[index].checked = col.visible
    });
    return cols;
  },
  save: function (cols) {
    localStorage.setItem('datatableCols', JSON.stringify(cols))
  }
}